import { AppContext, EffectParams, MachineDefinition, Questions } from "../types";

export function createQuestionsDefinition(questions: Questions) {
	const definition: any = {
		initial: 'question_1',
		context: {},
		states: {}
	} satisfies MachineDefinition<AppContext>;

	if (!questions) return definition

	for (const [questionId, question] of Object.entries(questions)) {
		const state: { [key: string]: any } = {
			on: {},
			effect: ({ setContext, event }: EffectParams<AppContext>) => {
				setContext(context => ({
					...context,
					[questionId]: event.payload !== undefined ? event.payload : event.type === 'YES'
				}));
			}
		}

		for (const [option, { next }] of Object.entries(question.options)) {
			state.on[option.toUpperCase()] = next === "END" ? 'end' : next;
		}

		definition.states[questionId] = state;
	}

	definition.states.end = {
		effect: ({ context }: EffectParams<AppContext>) => {
			console.log('Thank You', context);
		}
	};

	return definition;
}


