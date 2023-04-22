'use strict';
const popup = document.querySelector('.overlay');
const popupSubmitBtn = document.querySelector('.overlay .btn');
const overlayContainer = document.querySelector('.overlay .inner .wrapper');
const closeBtn = document.querySelector('.overlay .inner .close');
const fixballBtn = document.querySelector('.fixball_container .btn');
const choiceBtn = document.querySelector('.choice_container .btn');
const fixballContainer = document.querySelector('.fixball_container .wrapper');

// 팝업창 공 나오게 만듬
function createItem(number) {
	const itemrow = document.createElement('span');
	itemrow.setAttribute('class', 'ball');
	itemrow.innerText = number;
	return itemrow;
}

for (let i = 1; i < 46; i++) {
	let itemBall = createItem(i);
	overlayContainer.appendChild(itemBall);
}
const fixballs = document.querySelectorAll('.overlay .inner .wrapper .ball');

let otherNumbers = [];
let selectedNumbers = [];
let uniqueNumbers;

//  고정수를 만듬
function getFixball(e) {
	popup.classList.toggle('visible');
	if (clickNumber2) {
		overlayContainer.removeEventListener('click', clickNumber2);
		popupSubmitBtn.removeEventListener('click', () => {
			console.log('넘어오는 값2:', otherNumbers);
		});
	}
	overlayContainer.addEventListener('click', clickNumber);
}

// 선택수를 만듬
function getSelectball(e) {
	popup.classList.toggle('visible');
	if (clickNumber) {
		overlayContainer.removeEventListener('click', clickNumber);
		popupSubmitBtn.removeeventListener('click', fixballSubmitHandler);
	}
	overlayContainer.addEventListener('click', clickNumber2);
}
function clickNumber(e) {
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		if (selectedNumbers.indexOf(selectedNumber) === -1) {
			e.target.classList.toggle('fixballs');
			selectedNumbers.push(selectedNumber);
		} else {
			const index = selectedNumbers.indexOf(selectedNumber);
			selectedNumbers.splice(index, 1);
			e.target.classList.toggle('fixballs');
		}
		if (selectedNumbers.length > 5) {
			Swal.fire({
				icon: 'error',
				title: '욕심쟁이',
				text: '고정수는 5개 이하까지 선택하세요.',
			});
		}
	}
	// 로컬히스토리 저장해야됨
	console.log(selectedNumbers);

	popupSubmitBtn.addEventListener('click', fixballSubmitHandler);
}

const fixballSubmitHandler = () => {
	selectedNumbers
		.sort((a, b) => a - b)
		.forEach((el) => {
			let fixBalls = createItem(el);
			fixBalls.classList.add(colorClass(el));
			fixballContainer.appendChild(fixBalls);
			popup.classList.remove('visible');
		});
};
function clickNumber2(e) {
	if (e.target.classList.contains('ball')) {
		let otherNumber = parseInt(e.target.innerText);
		if (otherNumbers.indexOf(otherNumber) === -1) {
			e.target.style.backgroundColor = '#00c6cf';
			otherNumbers.push(otherNumber);
		}
	}

	popupSubmitBtn.addEventListener('click', () => {
		console.log('넘어오는 값2:', otherNumbers);
	});
}

fixballBtn.addEventListener('click', getFixball);

choiceBtn.addEventListener('click', getSelectball);

closeBtn.addEventListener('click', () => {
	popup.classList.remove('visible');
});

// otherNumbers = [15, 20, 25, 45, 31, 33, 36, 40, 16, 29];
// generateLottoNumbers(selectedNumbers, otherNumbers);
// for (let i = 0; i < uniqueNumbers.length; i++) {
// 	console.log(i + 1 + '번째: ' + uniqueNumbers[i].join(', '));
// }
// 고정수와 선택수를 받아서 로또 번호 생성한 다음 정렬
function generateLottoNumbers(selectedNumbers, otherNumbers) {
	let allNumbers = [];
	let val = selectedNumbers.length;
	console.log('val: ', val);
	let numberTime = val > 0 ? caseNumber(val) : 500;

	for (let i = 0; i < numberTime; i++) {
		let otherLottoNumbers = generateOtherLottoNumbers(otherNumbers);
		console.log('안:', otherLottoNumbers);

		let lottoNumbers = selectedNumbers.slice();
		if (lottoNumbers.length > 0) {
			for (let j = 0; j < lottoNumbers.length; j++) {
				otherLottoNumbers.splice(j, 1, lottoNumbers[j]);
			}
		}

		allNumbers.push(otherLottoNumbers);
	}

	allNumbers.forEach((el) => {
		el.sort((a, b) => a - b);
	});
	console.log('allNumbers: ', allNumbers);
	// allNumbers 2차원배열 정렬
	let temp = [];
	for (let i = 0; i < allNumbers.length; i++) {
		for (let j = i + 1; j < allNumbers.length; j++) {
			let smaller = true;
			for (let k = 0; k < 6; k++) {
				if (allNumbers[i][k] === allNumbers[j][k]) {
					if (allNumbers[i][k + 1] < allNumbers[j][k + 1]) {
						temp.push(allNumbers[i]);

						smaller = true;
						break;
					}
				} else if (allNumbers[i][k] < allNumbers[j][k]) {
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
	console.log(temp);
	// 중복요소 제거
	uniqueNumbers = [...new Set(temp.map(JSON.stringify))].map(JSON.parse);
	uniqueNumbers.sort(
		(a, b) =>
			a[0] - b[0] ||
			a[1] - b[1] ||
			a[2] - b[2] ||
			a[3] - b[3] ||
			a[4] - b[4] ||
			a[5] - b[5]
	);
	console.log(uniqueNumbers);
	return uniqueNumbers;
}

// 선택수를 랜덤으로 만듬
function generateOtherLottoNumbers(otherNumbers) {
	let lottoNumbers = [];

	while (lottoNumbers.length < 6) {
		let random = otherNumbers[Math.floor(Math.random() * otherNumbers.length)];
		if (lottoNumbers.indexOf(random) === -1) {
			lottoNumbers.push(random);
		}
	}

	return lottoNumbers;
}

// 로또 나오는 횟수
function caseNumber(val) {
	let resultLength = '';
	switch (val) {
		case 1:
			resultLength = 1500;
			break;
		case 2:
			resultLength = 1000;
			break;
		case 3:
			resultLength = 600;
			break;
		case 4:
			resultLength = 200;
			break;
	}
	return resultLength;
}

// 로또번호 고정수, 선택수 색상

function colorClass(ballNumber) {
	var className = '';
	switch (true) {
		case ballNumber < 11:
			className = 'yellowball';
			break;
		case ballNumber < 21:
			className = 'redball';
			break;
		case ballNumber < 31:
			className = 'grayball';
			break;
		case ballNumber < 46:
			className = 'greenball';
			break;
	}
	return className;
}
