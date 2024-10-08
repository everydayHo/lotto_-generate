const textEl = document.querySelector('#txt_num');
const confirmBtn = document.querySelector('.makebtn');
const filterSection = document.querySelector('.filter_section div');
const deleteBtn = document.querySelector('.deletebtn');

const changeHandler = (e) => {
	const inputValues = e.target.value.split(',');
	if (inputValues.length > 6) {
		Swal.fire({
			icon: 'error',
			title: '동반수초과',
			text: '동반수 7개 이하까지 선택하세요.',
		}).then(function () {
			textEl.value = '';
			filterSection.innerHTML = '';
		});
	}
	const filteringNumbers = inputValues.map((value) => Number(value));

	axios
		.get('https://smok95.github.io/lotto/results/all.json')
		.then(function (result) {
			const numbers = result.data.map((data) => {
				return [...data.numbers, data.bonus_no, data.draw_no];
			});
			const resultNumbers = numbers.filter((number) => {
				return filteringNumbers.every((condition) => {
					if (number[7] === condition) return;
					else return number.includes(condition);
				});
			});
			if (resultNumbers.length <= 0) {
				Swal.fire({
					icon: 'error',
					title: '',
					text: '일치하는 데이터가 없어요.',
				}).then(function () {
					textEl.value = '';
					filterSection.innerHTML = '';
				});
			}
			for (let i = 0; i < resultNumbers.length; i++) {
				const item = document.createElement('p');
				item.setAttribute('class', 'filter_text');
				for (let j = 0; j < resultNumbers[0].length - 1; j++) {
					const itemNumText = document.createElement('span');
					itemNumText.setAttribute('class', 'ball');
					itemNumText.innerText = resultNumbers[i][j];
					for (let k = 0; k < filteringNumbers.length; k++) {
						if (resultNumbers[i][j] === filteringNumbers[k]) {
							Object.assign(itemNumText.style, {
								borderTopWidth: '3px',
								borderRightWidth: '3px',
								borderBottomWidth: '3px',
								borderLeftWidth: '3px',
							});
						}
					}
					itemNumText.classList.add(colorClass(itemNumText.innerText));
					item.append(itemNumText);
				}
				let k = 7;
				const roundText = document.createElement('span');
				roundText.setAttribute('class', 'round_num');
				roundText.innerText = `${resultNumbers[i][k]}회차`;
				item.append(roundText);
				filterSection.append(item);
			}
			const bonusText = document.createElement('p');
			bonusText.setAttribute('class', 'bonus_num');
			bonusText.innerText = '보너스번호';
			filterSection.append(bonusText);
			const filterTex = document.querySelector('.filter_text');
			const filterTextLastChildEl = document.querySelector('.filter_text > span:nth-child(7)');
			const filterTextOffsetLeft = document.querySelector('.filter_text').offsetLeft;
			let lastElOffset;
			const winMatch = window.matchMedia('(min-width: 480px)');
			winMatch.matches
				? (lastElOffset = filterTextLastChildEl.offsetWidth + filterTextLastChildEl.offsetLeft + filterTextOffsetLeft - 70)
				: (lastElOffset = filterTextLastChildEl.offsetWidth + filterTextLastChildEl.offsetLeft + filterTextOffsetLeft - 45);
			bonusText.style.left = lastElOffset + 'px';
		})
		.catch(function (error) {
			console.log('에러 발생: ', error);
		});
};

textEl.addEventListener('change', changeHandler);

deleteBtn.addEventListener('click', () => {
	textEl.value = '';
	filterSection.innerHTML = '';
});

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
