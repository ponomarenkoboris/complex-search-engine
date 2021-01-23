// Previous debouce function
// const debounce = (send, time) => {
//     let timeout;
//     return function () {
//         const call = () => { send.apply(this, arguments) };
//         clearTimeout(timeout);
//         timeout = setTimeout(call, time);
//     };
// }

// function sendReq(e) {   
//   result.innerHTML = '';
//   if(e.target.value === '') {
//     return
//   }

//   fetch(`http://localhost:3000/user/${socialNetwork}/${e.target.value}`)
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }          
//     })
//     .catch(err => console.log(err))
//     .then(data => {
//       render(socialNetwork, data, result);
//     }
//   );      
// }; 

// sendReq = debounce(sendReq, 500);
// search.addEventListener('keydown', sendReq);

function debounce(callback, limit) {
    let timeout;
    return function(){
        const call = () => callback.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(call, limit);
    };
}
export default debounce;