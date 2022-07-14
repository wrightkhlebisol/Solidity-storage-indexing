const Web3 = require("web3");
const web3 = new Web3("wss://ropsten.infura.io/ws/v3/4fc321310eee40b1b9c1310aaf30f40f");
const contractAddress = "0x28bA83D2231a9a83B36eDB5afafCa26b9A148554";
getStorageValues();

async function getStorageValues() {
	// #1 single variable uint
	var res = await web3.eth.getStorageAt(contractAddress, 0);
	console.log(`firstVar: ${res} ${parseInt(res, 16)}`);

	// #2 single variable string
	var res = await web3.eth.getStorageAt(contractAddress, 1);
	console.log(`secondVar: ${res} ${web3.utils.toAscii(res)}`);

	// #3 a constant
	// Constants are stored in the contract code

	// #4 two variables in a slot
	var res = await web3.eth.getStorageAt(contractAddress, 2);
	console.log(`third and fourth var: ${res}`);

	// #5 static array
	var res = await web3.eth.getStorageAt(contractAddress, 3);
	console.log(`Index 3: ${res}`);

	var res = await web3.eth.getStorageAt(contractAddress, 4);
	console.log(`Index 4: ${res}`);

	var res = await web3.eth.getStorageAt(contractAddress, 5);
	console.log(`Index 5: ${res}`);

	// #6 Dynamic array
	var res = await web3.eth.getStorageAt(contractAddress, 6);
	console.log(`Dynamic Array at Index 6: ${res}`);

	// Dynamic array value 1
	// Hash the index - to get the data location
	let hashedDynamicArrayIndex = web3.utils.soliditySha3(6);
	console.log({ hashedDynamicArrayIndex });

	var storage01 = await web3.eth.getStorageAt(contractAddress, hashedDynamicArrayIndex);
	console.log(`Dynamic Array Index 0: ${storage01} ${parseInt(storage01)}`);

	// Dynamic array value 2
	// Add 1 to the BigInt hashedIndex - to get the data location
	let hexIndexPlusOne = (BigInt(hashedDynamicArrayIndex) + 1n).toString(16)
	if (hexIndexPlusOne % 2) {
		hexIndexPlusOne = '0' + hexIndexPlusOne;
	}

	hexIndexPlusOne = '0x' + hexIndexPlusOne;

	console.log({ hexIndexPlusOne });
	var storage02 = await web3.eth.getStorageAt(contractAddress, hexIndexPlusOne);
	console.log(`Dynamic Array Index 0: ${storage02} ${parseInt(storage02)}`);

	// #7 Struct
	var res = await web3.eth.getStorageAt(contractAddress, 7);
	console.log(`Struct at Index 7: ${web3.utils.toAscii(res)}`);

	// #8 Struct
	var res = await web3.eth.getStorageAt(contractAddress, 8);
	console.log(`Struct at Index 8: ${parseInt(res)}`);

	// #9 Struct
	mappingKey = web3.utils.soliditySha3(10, 9);
	var res = await web3.eth.getStorageAt(contractAddress, mappingKey);
	console.log(`Struct at Index 9, key 10: ${parseInt(res)}`);

	mappingKey = web3.utils.soliditySha3(11, 9);
	var res = await web3.eth.getStorageAt(contractAddress, mappingKey);
	console.log(`Struct at Index 9, key 11: ${parseInt(res)}`);
}