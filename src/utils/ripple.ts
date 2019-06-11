// [].map.call(document.querySelectorAll('[anim="ripple"]'), el => {
//     el.addEventListener('click', e => {
//         e = e.touches ? e.touches[0] : e;
//         const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
//         el.style.cssText = `--s: 0; --o: 1;`; el.offsetTop;
//         el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
//     })
// })

// export const rippleMe = (e: any) => {
//     const el = e.target as HTMLElement;
//     console.log(el)
//     'touches' in e ? e.touches[0] : e;
//     const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
//     el.style.cssText = `--s: 0; --o: 1;`; el.offsetTop;
//     el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
// }