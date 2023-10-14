const textEl = document.querySelector('#txt_num');
const filterSection = document.querySelector('.filter_section div');
const deleteBtn = document.querySelector('.deletebtn');

const changeHandler = (e) => {
  const inputValues = e.target.value.split(',');
  console.log(inputValues);
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
          return number.includes(condition);
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
      for (let i = 0; i < resultNumbers.length - 1; i++) {
        const item = document.createElement('p');
        item.setAttribute('class', 'filter_text');
        for (let j = 0; j < resultNumbers[0].length - 1; j++) {
          const itemNumText = document.createElement('span');
          itemNumText.setAttribute('class', 'ball');
          itemNumText.innerText = resultNumbers[i][j];
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
      const bonus_text = document.createElement('p');
      bonus_text.setAttribute('class', 'bonus_num');
      bonus_text.innerText = '보너스번호';
      filterSection.append(bonus_text);
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
