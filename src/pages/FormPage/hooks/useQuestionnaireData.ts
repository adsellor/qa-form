import { useQuery } from "@tanstack/react-query"
import { getQuestions } from "../../../api/mockApi";

export const useQuestionnaireData = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['questionnaire'],
		queryFn: async () => await getQuestions(),
	});


	return { questions: data as Record<any, any>, isQuestionnaireLoading: isLoading }
}
