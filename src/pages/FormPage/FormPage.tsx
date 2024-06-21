import { useMemo } from 'react';
import { useFSM } from '../../hooks';
import { useQuestionnaireData } from './hooks';
import { FormTextInput } from '../../components/Form/ForTextInput';
import { FormYesNoInput } from '../../components/Form/ForYesNoInput';
import { Question } from '../../types';
import { createQuestionsDefinition } from '../../state/createQuestionsDefinition';


const QuestionnairePage = () => {
	const { questions, isQuestionnaireLoading } = useQuestionnaireData();

	const definition = useMemo(() => createQuestionsDefinition(questions), [questions])
	const machine = useFSM(definition);

	if (isQuestionnaireLoading || !definition) {
		return <div> Loading ... </div>
	}


	console.log(machine.state.value)
	if (machine.state.value === 'end') {
		return <div> Your answers are `${JSON.stringify(machine.state.context, null, 2)}` </div>
	}
	const currentItem: Question = questions[machine.state.value]

	return (
		<form>
			{currentItem?.type === "boolean"
				?
				<FormYesNoInput
					title={currentItem.text}
					onNo={() => machine?.send('NO')}
					onYes={() => machine?.send('YES')} />
				:
				<FormTextInput
					title={currentItem.text}
					action={
						(value) => {
							if (Number.parseInt(value) > 100) {
								machine.send('END')
							} else {
								machine.send({

									type: 'NEXT',
									payload: value
								})
							}
						}

					}
				/>

			}
		</form>
	);
};

export default QuestionnairePage;

