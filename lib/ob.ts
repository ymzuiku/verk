export const ob = new Map();
export function dispatchOb(){
  ob.forEach((v, k)=>{
    v();
  })
}