var nowdigit = 0
var mistake = 5
var dotick = true

function init() {
  document.addEventListener('mousedown', function (event) {
    if (!input.contains(event.target)) {
      event.preventDefault(); // Prevent the default behavior (unfocusing)
    }
  });
  var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  var init = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275900994657640789512694683983525957098258226205224894077267194782684826014769909"
  var initIndex = 0
  for (var i = 0; i < 100; i++) {
    var row = document.createElement('tr');
    for (var j = 0; j < 20; j++) {
      var cell = document.createElement('td');
      var input = document.createElement('input');
      input.style.color = "#FF0000"
      if (i == 0 && j == 0) { input.value = '3'; input.style.color = "#00AA00" }
      if (i == 0 && j == 1) { input.value = '.'; input.style.color = "#00AA00" }
      input.type = 'text';
      input.maxLength = 1;
      input.setAttribute('data-hidden-value', init.charAt(initIndex));
      initIndex += 1
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('mousedown', function (event) {
      event.preventDefault(); // Prevent the default behavior (focus) on mouse click
    });
    inputs[i].addEventListener('keydown', function (event) {
      if (event.keyCode === 39) { // Right arrow key
        moveFocus();
        event.preventDefault();
      }
    });
    inputs[i].addEventListener('keydown', function (event) {
      if (event.keyCode === 13) { // Enter
        showone()
        event.preventDefault();
      }
    });
    inputs[i].addEventListener('keydown', function (event) {
      if (event.keyCode === 32) { // space
        showanswer()
        event.preventDefault();
      }
    });
  }
  document.getElementsByTagName('td')[2].getElementsByTagName('input')[0].focus()
}

function moveFocus() {
  var currentInput = document.activeElement;
  var currentCell = currentInput.parentNode;
  var nextCell = currentCell.nextElementSibling;

  if (nextCell) {
    var nextInput = nextCell.getElementsByTagName('input')[0];
    nextInput.focus();
    nextInput.select();
  } else {
    var currentRow = currentCell.parentNode;
    var nextRow = currentRow.nextElementSibling;
    if (nextRow) {
      var firstInput = nextRow.firstElementChild.getElementsByTagName('input')[0];
      firstInput.focus();
      firstInput.select();
    }
  }
}

init();


function showone() {
  var input = document.activeElement
  var hiddenValue = input.getAttribute('data-hidden-value');
  input.value = hiddenValue;
  input.style.color = '#FF0000'
  moveFocus()
}

function showanswer() {
  dotick = false
  console.log('A')
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    var input = cells[i].getElementsByTagName('input')[0];
    var hiddenValue = input.getAttribute('data-hidden-value');
    input.value = hiddenValue;
  }
}

var test = setInterval(tick, 10);

function tick() {
  if (!dotick) {
    return
  }
  if (document.activeElement.tagName != 'INPUT') {
    return
  }
  if (document.activeElement.value == document.activeElement.getAttribute('data-hidden-value')) {
    document.activeElement.style.color = "#00FF00"
    moveFocus()
    nowdigit += 1
    document.getElementById('ui').textContent = `${nowdigit}번째 자리 입력 중, 기회 ${mistake}번 남음`
  }
  else if (document.activeElement.value != '') {
    document.activeElement.value = ''
    mistake -= 1
    document.getElementById('ui').textContent = `${nowdigit}번째 자리 입력 중, 기회 ${mistake}번 남음`
    if (mistake <= 0) {
      showanswer()
      document.getElementById('ui').textContent = "클릭해서 재시작"
    }
  }
}

function restart() {
  document.body.innerHTML = `
  <p id="ui" onclick="restart()" style="background-color: #DDDDDD; border: #DDDDDD solid 50px; margin: 0px; margin-left:auto; margin-right: auto; width: fit-content; font-size: 40pt;">0번째 자리 입력 중, 기회 5번 남음</p>
  <table id="myTable" style="margin: auto;">
    <tbody></tbody>
  </table>';`
  nowdigit = 0
  mistake = 5
  init();
  dotick = true
}