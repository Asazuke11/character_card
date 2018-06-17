(function() {
  'usestrict';

  /*****************************************
   * $getE に getElementById　まとめてます。
   *****************************************/
  const $getE = {
    userNameInput: document.getElementById('user-name'),
    user_male: document.getElementById('male'),
    user_female: document.getElementById('female'),
    assessmentButton: document.getElementById('assessment'),
    result_name: document.getElementById('name'),
    result_gender: document.getElementById('gender'),
    result_id: document.getElementById('id_Number'),
    strength: document.getElementById('strength'),
    Intellect: document.getElementById('Intellect'),
    Endurance: document.getElementById('Endurance'),
    Magical: document.getElementById('Magical'),
    agile: document.getElementById('agile'),
    Fortune: document.getElementById('Fortune'),
    picture: document.getElementById('img')
  };

  /***************************************************
   *for文にて画像名を配列に。
   * 配列NumberM = 男性イラスト
   * 配列NumberF = 女性イラスト
   ***************************************************/
  var NumberM = [];
  var NumberF = [];
  for (let i = 0; i < 48; i++) {
    NumberM.push("url('images/m/" + i + ".png')");
    NumberF.push("url('images/f/" + i + ".png')");
  }

  /******************************************************
   * ラジオボタンの on,off の状態で、イラストを切り替える関数
   *
   * @param{Number} flag 　0：画像無し、１：男性、２：女性
   *
   ******************************************************/
  var flag = 0;
  $getE.user_male.onclick = () => {
    $getE.result_gender.innerText = '♂';
    flag = 1;
    $getE.user_female.checked = false;
  };
  $getE.user_female.onclick = () => {
    $getE.result_gender.innerText = '♀';
    flag = 2;
    $getE.user_male.checked = false;
  };

  $getE.assessmentButton.onclick = () => {
    /*******************************************************
   * [作成]ボタンを押した時に動く関数の中身
   * 
   * テキストボックスに名前が入力されていない時のガード句。
   * 挿入された名前のsumOfcharCodeの数字で人物イラストを指定する関数。
   * 挿入された名前のsumOfcharCodeの数字とランダム数値から、
      ステータスA~Dを決める関数。
   * 各エレメントに結果を反映させる関数。
   * 
   ******************************************************/
    /* ユーザー名をuserNameへ */
    const userName = $getE.userNameInput.value;

    if (userName.length === 0) {
      return; /* ガード句 */
    }

    function pic(userName) {
      /**
       * 文字コードから人物イラストを決定し、
       * 文字コードをエレメントのIDへ書き込みの関数。
       *
       * @param {string} userName ユーザー名
       * @return {Number} picNum 画像名の先頭の数字。
       *
       */

      let sumOfcharCode = 0;
      for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
      }
      $getE.result_id.innerText = sumOfcharCode;
      const picNum = sumOfcharCode % NumberM.length;
      return picNum;
    }

    function assessment(userName) {
      /**
       * 文字コードからキャラクター能力を決める関数
       * @param {string} userName ユーザー名
       * @return {string} result ステータスA~Dの文字
       */

      let sumOfcharCode = 0;
      for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
      }
      const index = sumOfcharCode % 4;

      let randam_4 = Math.floor(Math.random() * 4);
      let parameter = (index + randam_4) % 4;
      let result = 0;
      if (parameter === 0) {
        result = 'D';
      } else if (parameter === 1) {
        result = 'C';
      } else if (parameter === 2) {
        result = 'B';
      } else if (parameter === 3) {
        result = 'A';
      }
      return result;
    }

    /***************************************************
     * 作った関数を実際に実行
     * 各エレメントに反映。
     ***************************************************/
    const imageNum = pic(userName);
    $getE.result_name.innerText = userName;
    $getE.strength.innerText = assessment(userName);
    $getE.Intellect.innerText = assessment(userName);
    $getE.Endurance.innerText = assessment(userName);
    $getE.Magical.innerText = assessment(userName);
    $getE.agile.innerText = assessment(userName);
    $getE.Fortune.innerText = assessment(userName);

    if (flag === 1) {
      $getE.picture.style.backgroundImage = NumberM[pic(userName)];
    } else if (flag === 2) {
      $getE.picture.style.backgroundImage = NumberF[pic(userName)];
    } else {
      return;
    }
  };
})();
