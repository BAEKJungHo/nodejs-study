/* 
Result : 
동기식 코드
데이터 저장 완료한 객체 반환
알림
*/

// async, await
async function async() {
    console.log('동기식 코드');
    const saveResult = await save();
    console.log(saveResult);
    await nofification();
}

async function save() {
    // 데이터 저장하는데 1초 걸린다 가정
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('데이터 저장 완료한 객체 반환');
        }, 1000);
    }).then();

    return result;
}

async function nofification() {
    // 알림을 보내는데 1초 걸린다 가정
    setTimeout(() => {
       console.log('알림'); 
    }, 1000);
}

async();