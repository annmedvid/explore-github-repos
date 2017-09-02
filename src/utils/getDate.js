const monthNames = [
	"January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
]

function getDate(data) {
	let date = new Date(data)

	const year = date.getYear() !== new Date().getYear() ? `, ${date.getYear() + 1900}` : ''
	
  	return `${monthNames[date.getMonth()]} ${date.getDate()}${year}`
}

export default getDate
