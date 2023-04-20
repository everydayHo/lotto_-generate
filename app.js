'use strict';
const popup = document.querySelector('.overlay');
const popupSubmitBtn = document.querySelector('.overlay .btn');
const overlayContainer = document.querySelector('.overlay .inner .wrapper');
const closeBtn = document.querySelector('.overlay .inner .close');
const fixballBtn = document.querySelector('.fixball_container .btn');
const choiceBtn = document.querySelector('.choice_container .btn');

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
	}
	overlayContainer.addEventListener('click', clickNumber);
}

// 선택수를 만듬
function getSelectball(e) {
	popup.classList.toggle('visible');
	if (clickNumber) {
		overlayContainer.removeEventListener('click', clickNumber);
	}
	overlayContainer.addEventListener('click', clickNumber2);
}
function clickNumber(e) {
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		if (selectedNumbers.indexOf(selectedNumber) === -1) {
			e.target.style.backgroundColor = '#ff2c56';
			selectedNumbers.push(selectedNumber);
		}
	}
	popupSubmitBtn.addEventListener('click', () => {
		console.log('넘어오는 값1:', selectedNumbers);
	});
}

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

popupSubmitBtn.addEventListener('click', () => {
	selectedNumbers = [3, 24];
	otherNumbers = [13, 25, 22, 10, 32, 35, 40, 41];
	generateLottoNumbers(selectedNumbers, otherNumbers);
	for (let i = 0; i < uniqueNumbers.length; i++) {
		console.log(i + 1 + '번째: ' + uniqueNumbers[i].join(', '));
	}
});

closeBtn.addEventListener('click', () => {
	popup.classList.remove('visible');
});

// 고정수와 선택수를 받아서 로또 번호 생성한 다음 정렬
function generateLottoNumbers(selectedNumbers, otherNumbers) {
	let allNumbers = [];
	for (let i = 0; i < 100; i++) {
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

	return uniqueNumbers;
}

// 선택수를 랜덤으로 만듬
function generateOtherLottoNumbers(otherNumbers) {
	let lottoNumbers = [];
	if (otherNumbers.length > 6) {
		while (lottoNumbers.length < 6) {
			let random =
				otherNumbers[Math.floor(Math.random() * otherNumbers.length)];
			if (lottoNumbers.indexOf(random) === -1) {
				lottoNumbers.push(random);
			}
		}
	}
	return lottoNumbers;
}
