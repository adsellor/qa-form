import mockData from './mockData.json'

export const getQuestions = async () => {
	const data = new Promise(resolve => {
		setTimeout(() => resolve(mockData), 1000)
	})

	return data;
}
