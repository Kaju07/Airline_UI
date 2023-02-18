console.log('in k')

const getfullname=(a,b)=>{
return `${a} ${b}`
}

const fullname= getfullname('kajal','ingale');
const expectedname='kajal ingale'

if(fullname!=expectedname)
{
    throw new Error('not same ')
}