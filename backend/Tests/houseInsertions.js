const House = require("../models/house");

const array = [
	{
		id: 1,
		block: "A",
	},
	{
		id: 2,
		block: "A",
	},
	{
		id: 3,
		block: "A",
	},
	{
		id: 4,
		block: "A",
	},
	{
		id: 5,
		block: "A",
	},
	{
		id: 1,
		block: "B",
	},
	{
		id: 2,
		block: "B",
	},
	{
		id: 3,
		block: "B",
	},
	{
		id: 4,
		block: "B",
	},
	{
		id: 5,
		block: "B",
	},
];
House.insertMany(array)
	.then((res) => {
		console.log(res[0]);
	})
	.catch((err) => {
		console.log(err);
	});
