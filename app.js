'use strict';
const popup = document.querySelector('.overlay');
const popupSubmitBtn = document.querySelector('.overlay .btn');
const overlayContainer = document.querySelector('.overlay .inner .wrapper');
const closeBtn = document.querySelector('.overlay .inner .close');
const fixballBtn = document.querySelector('.fixball_container .btn');
const choiceBtn = document.querySelector('.choice_container .btn');
const fixballContainer = document.querySelector('.fixball_container .wrapper');
const selectballContainer = document.querySelector('.choice_container .wrapper');
const generateContainer = document.querySelector('.generate_container .wrapper');

const generateArea = document.querySelector('.generate_container .wrapper p');
const generateBtn = document.querySelector('.generate_container .makebtn');
const regenerateBtn = document.querySelector('.generate_container .refreshbtn');
const loadingContainer = document.querySelector('.generate_container .loading-container');

// 팝업창 공 나오게 만듬
function createItem(number) {
	const itemrow = document.createElement('span');
	itemrow.setAttribute('class', 'ball');
	itemrow.innerText = number;
	return itemrow;
}

for (let i = 1; i < 46; i++) {
	let itemBall = createItem(i);

	if (overlayContainer) {
		overlayContainer.appendChild(itemBall);
	}
}
const fixballs = document.querySelectorAll('.overlay .inner .wrapper .ball');

let otherNumbers = [];
let selectedNumbers = [];
let uniqueNumbers;

//  고정수를 만듬
function getFixball(e) {
	popup.classList.toggle('visible');
	if (clickSelectNumber) {
		overlayContainer.removeEventListener('click', clickSelectNumber);
		popupSubmitBtn.removeEventListener('click', selectballSubmitHandler);
	}
	overlayContainer.addEventListener('click', clickNumber);
}

// 선택수를 만듬
function getSelectball(e) {
	popup.classList.toggle('visible');
	if (clickNumber) {
		overlayContainer.removeEventListener('click', clickNumber);
		popupSubmitBtn.removeEventListener('click', fixballSubmitHandler);
	}
	overlayContainer.addEventListener('click', clickSelectNumber);
}
function clickNumber(e) {
	if (e.target.classList.contains('ball')) {
		let selectedNumber = parseInt(e.target.innerText);
		if (selectedNumbers.indexOf(selectedNumber) === -1 && !otherNumbers.includes(selectedNumber)) {
			e.target.classList.toggle('fixballs');
			selectedNumbers.push(selectedNumber);
		} else {
			if (!otherNumbers.includes(selectedNumber)) {
				const index = selectedNumbers.indexOf(selectedNumber);
				selectedNumbers.splice(index, 1);
				e.target.classList.toggle('fixballs');
			}
		}
		if (selectedNumbers.length > 5) {
			Swal.fire({
				icon: 'error',
				title: '욕심쟁이',
				text: '고정수는 5개 이하까지 선택하세요.',
			}).then(function () {
				selectedNumbers.pop();
				e.target.classList.toggle('fixballs');
			});
		}
		if (e.target.classList.contains('selectballs')) {
			Swal.fire({
				icon: 'error',
				title: '선택수클릭',
				text: '선택수 수정은 선택수 지정에서 하세요.',
			});
		}
	}

	// 로컬히스토리 저장해야됨

	popupSubmitBtn.addEventListener('click', fixballSubmitHandler);
}

const fixballSubmitHandler = () => {
	fixballContainer.innerHTML = '';
	selectedNumbers
		.sort((a, b) => a - b)
		.forEach((el) => {
			let fixBalls = createItem(el);
			fixBalls.classList.add(colorClass(el));
			fixballContainer.appendChild(fixBalls);
			popup.classList.remove('visible');
		});
};
function clickSelectNumber(e) {
	if (e.target.classList.contains('ball')) {
		let otherNumber = parseInt(e.target.innerText);
		if (otherNumbers.indexOf(otherNumber) === -1 && !selectedNumbers.includes(otherNumber)) {
			e.target.classList.toggle('selectballs');
			otherNumbers.push(otherNumber);
		} else {
			if (!selectedNumbers.includes(otherNumber)) {
				const index = otherNumbers.indexOf(otherNumber);
				otherNumbers.splice(index, 1);
				e.target.classList.toggle('selectballs');
			}
		}
		if (e.target.classList.contains('fixballs')) {
			Swal.fire({
				icon: 'error',
				title: '고정수 클릭',
				text: '고정수 수정은 고정수 지정에서 하세요.',
			});
		}
	}

	popupSubmitBtn.addEventListener('click', selectballSubmitHandler);
}

const selectballSubmitHandler = () => {
	selectballContainer.innerHTML = '';
	if (otherNumbers.length < 6) {
		Swal.fire({
			icon: 'error',
			title: '선택수가 작아요',
			text: '선택수가 6개 이상이여야합니다.',
		});
	} else {
		otherNumbers
			.sort((a, b) => a - b)
			.forEach((el) => {
				let otherBalls = createItem(el);
				otherBalls.classList.add(colorClass(el));
				selectballContainer.appendChild(otherBalls);
				popup.classList.remove('visible');
			});
	}
};

fixballBtn.addEventListener('click', getFixball);

choiceBtn.addEventListener('click', getSelectball);

closeBtn.addEventListener('click', () => {
	popup.classList.remove('visible');
});

const makeLuckyball = () => {
	generateContainer.innerHTML = '';
	loadingContainer.classList.add('show');
	if (otherNumbers.length > 5) {
		generateLottoNumbers(selectedNumbers, otherNumbers);
		for (let i = 0; i < uniqueNumbers.length; i++) {
			const item = document.createElement('p');
			const itemNumText = document.createElement('span');
			let odd = 0;
			let even = 0;
			item.innerHTML = `<span>${i + 1}번째</span>`;
			for (let j = 0; j < 6; j++) {
				const itemIdx = document.createElement('span');
				itemIdx.setAttribute('class', 'ball');
				itemIdx.innerText = uniqueNumbers[i][j];
				itemIdx.classList.add(colorClass(itemIdx.innerText));

				if (uniqueNumbers[i][j] % 2 === 1) {
					odd += 1;
				} else even += 1;
				let itemNum = `홀짝 ${odd}:${even}`;
				itemNumText.setAttribute('class', 'oddnum');
				itemNumText.innerText = itemNum;
				item.append(itemIdx);
			}
			item.append(itemNumText);
			generateContainer.append(item);
		}
		if (generateContainer.childNodes.length > 0) {
			loadingContainer.classList.remove('show');
		}
	}
};
generateBtn.addEventListener('click', makeLuckyball);

regenerateBtn.addEventListener('click', () => {
	Swal.fire('초기화할까요?', 'OK버튼을 클릭하시면 초기화됩니다.', 'question').then(function (result) {
		if (result.isConfirmed) {
			generateContainer.innerHTML = '';
			selectballContainer.innerHTML = '';
			fixballContainer.innerHTML = '';
			selectedNumbers = [];
			otherNumbers = [];
			const popupBalls = popup.querySelectorAll('span');
			popupBalls.forEach((el) => {
				el.classList.remove('fixballs');
				el.classList.remove('selectballs');
			});
		}
	});
});

// 고정수와 선택수를 받아서 로또 번호 생성한 다음 정렬
function generateLottoNumbers(selectedNumbers, otherNumbers) {
	let allNumbers = [];
	let val = selectedNumbers.length;
	let numberTime = val > 0 ? caseNumber(val) : 300;

	for (let i = 0; i < numberTime; i++) {
		let otherLottoNumbers = generateOtherLottoNumbers(otherNumbers);

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

	// 중복요소 제거
	uniqueNumbers = [...new Set(temp.map(JSON.stringify))].map(JSON.parse);
	uniqueNumbers.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3] || a[4] - b[4] || a[5] - b[5]);

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
			resultLength = 500;
			break;
		case 2:
			resultLength = 300;
			break;
		case 3:
			resultLength = 200;
			break;
		case 4:
			resultLength = 100;
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
			className = 'blueball';
			break;
		case ballNumber < 31:
			className = 'redball';
			break;
		case ballNumber < 41:
			className = 'grayball';
			break;
		case ballNumber < 46:
			className = 'greenball';
			break;
	}
	return className;
}

// 화살표 위로 올라가기

const arrow = document.querySelector('main .back_to_top');

window.addEventListener('scroll', () => {
	if (window.scrollY > 1000) {
		arrow.classList.add('active');
	} else {
		arrow.classList.remove('active');
	}
});

arrow.addEventListener('click', (e) => {
	e.preventDefault();
	document.body.scrollIntoView({ behavior: 'smooth' });
});
