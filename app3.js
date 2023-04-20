// let temp = [];
// let allNumbers = [
// 	[1, 3, 10, 24, 35, 40],
// 	[1, 6, 10, 20, 34, 45],
// 	[1, 10, 34, 39, 43, 45],
// ];
// for (let i = 0; i < allNumbers.length; i++) {
// 	for (let j = i + 1; j < allNumbers.length; j++) {
// 		for (let k = 0; k < 6; k++) {
// 			if (allNumbers[i][k] < allNumbers[j][k]) {
// 				temp.push(allNumbers[i]);
// 			} else if (allNumbers[i][k] === allNumbers[j][k]) {
// 				if (allNumbers[i][k + 1] < allNumbers[j][k + 1]) {
// 					temp.push(allNumbers[i]);
// 				}
// 			} else temp.push(allNumbers[j]);
// 		}
// 	}
// }
// allNumbers = temp;
// console.log(allNumbers);

// let allNumbers = [
// 	[1, 3, 10, 24, 35, 40],
// 	[1, 6, 10, 20, 34, 45],
// 	[1, 10, 34, 39, 43, 45],
// 	[1, 13, 24, 39, 43, 45],
// 	[1, 16, 34, 39, 43, 45],
// 	[1, 19, 34, 39, 43, 45],
// 	[1, 20, 34, 39, 43, 45],
// ];
// let temp = [];
// for (let i = 0; i < allNumbers.length; i++) {
// 	for (let j = i + 1; j < allNumbers.length; j++) {
// 		for (let k = 0; k < 6; k++) {
// 			if (allNumbers[i][k] < allNumbers[j][k]) {
// 				temp.push(allNumbers[i]);
// 				break; // 더 이상 비교할 필요 없으므로 반복문을 빠져나옵니다.
// 			} else if (allNumbers[i][k] > allNumbers[j][k]) {
// 				temp.push(allNumbers[j]);
// 				break;
// 				// 더 이상 비교할 필요 없으므로 반복문을 빠져나옵니다.
// 			} else if (allNumbers[i][k] === allNumbers[j][k] && k === 5) {
// 				// 마지막 숫자까지 같다면 두 숫자가 같다는 뜻이므로 아무것도 하지 않습니다.
// 			}
// 		}
// 	}
// }

// let allNumbers = [
// 	[1, 3, 10, 24, 35, 40],
// 	[1, 6, 10, 20, 34, 45],
// 	[1, 10, 34, 39, 43, 45],
// 	[1, 13, 24, 39, 43, 45],
// 	[1, 16, 34, 39, 43, 45],
// 	[1, 19, 34, 39, 43, 45],
// 	[1, 20, 34, 39, 43, 45],
// ];
// let temp = [];
// for (let i = 0; i < allNumbers.length; i++) {
// 	for (let j = i + 1; j < allNumbers.length; j++) {
// 		let smaller = true;
// 		for (let k = 0; k < 6; k++) {
// 			if (allNumbers[i][k] < allNumbers[j][k]) {
// 				temp.push(allNumbers[i]);
// 				smaller = true;
// 				break; // 더 이상 비교할 필요 없으므로 반복문을 빠져나옵니다.
// 			} else if (allNumbers[i][k] > allNumbers[j][k]) {
// 				temp.push(allNumbers[j]);
// 				smaller = false;
// 				break;
// 				// 더 이상 비교할 필요 없으므로 반복문을 빠져나옵니다.
// 			} else if (allNumbers[i][k] === allNumbers[j][k] && k === 5) {
// 				if (allNumbers[i][k + 1] < allNumbers[j][k + 1]) {
// 					temp.push(allNumbers[i]);
// 				}
// 				smaller = true;
// 			}
// 		}
// 		// 두 숫자가 같은 경우에는 추가하지 않습니다.
// 		if (!smaller) {
// 			temp.push(allNumbers[i]);
// 			temp.push(allNumbers[j]);
// 		}
// 	}
// }
// console.log(temp);

// allNumbers = temp;
// console.log(allNumbers);
// let allNumbers = [
// 	[1, 3, 10, 24, 35, 40],
// 	[1, 6, 10, 20, 34, 45],
// 	[1, 10, 34, 39, 43, 45],
// 	[1, 13, 24, 39, 43, 45],
// 	[1, 16, 34, 39, 43, 45],
// 	[1, 19, 34, 39, 43, 45],
// 	[1, 20, 34, 39, 43, 45],
// ];

// let temp = [];
// for (let i = 0; i < allNumbers.length; i++) {
// 	for (let j = i + 1; j < allNumbers.length; j++) {
// 		let smaller = true;
// 		for (let k = 0; k < 6; k++) {
// 			if (allNumbers[i][k] < allNumbers[j][k]) {
// 				temp.push(allNumbers[i]);
// 				break;
// 			} else if (allNumbers[i][k] > allNumbers[j][k]) {
// 				temp.push(allNumbers[j]);
// 				smaller = false;
// 				break;
// 			} else if (allNumbers[i][k] === allNumbers[j][k] && k === 5) {
// 				if (allNumbers[i][k + 1] < allNumbers[j][k + 1]) {
// 					temp.push(allNumbers[i]);
// 					break;
// 				}
// 			}
// 		}
// 		if (!smaller) {
// 			temp.push(allNumbers[i], allNumbers[j]);
// 		}
// 	}
// }

// let uniqueNumbers = [...new Set(temp.map(JSON.stringify))].map(JSON.parse);

// console.log(uniqueNumbers);
// console.log(uniqueNumbers.length);

let allNumbers = [
	[1, 3, 10, 24, 35, 40],
	[1, 6, 10, 20, 34, 45],
	[1, 10, 34, 39, 43, 45],
	[1, 8, 24, 39, 40, 45],
	[1, 20, 34, 39, 42, 45],
	[1, 19, 34, 39, 43, 45],
	[1, 20, 34, 39, 44, 45],
];

let temp = [];
for (let i = 0; i < allNumbers.length; i++) {
	for (let j = i + 1; j < allNumbers.length; j++) {
		let smaller = true;
		for (let k = 0; k < 6; k++) {
			if (allNumbers[i][k] < allNumbers[j][k]) {
				temp.push(allNumbers[i]);
				smaller = true;
				break;
			} else if (allNumbers[i][k] > allNumbers[j][k]) {
				temp.push(allNumbers[j]);
				smaller = false;
				break;
			}
		}
		if (smaller) {
			temp.push(allNumbers[i]);
		} else {
			temp.push(allNumbers[j]);
		}
	}
}

let uniqueNumbers = [...new Set(temp.map(JSON.stringify))].map(JSON.parse);

console.log(uniqueNumbers);
console.log(uniqueNumbers.length);
