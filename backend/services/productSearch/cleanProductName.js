const cleanProductName =
(title)=>{

  return title

  .replace(/\([^)]*\)/g,"")

  .replace(/\d+GB/g,"")

  .replace(/\|/g,"")

  .trim();

};

module.exports =
cleanProductName;