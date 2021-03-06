
import db from '../models/index';

let getTopDoctorHome = (limitInput)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let users = await db.User.findAll({
                where: { roleId: 'R2' },
                limit:limitInput,
                order: [['createdAt','DESC']],
                attributes: {
                    exclude: ['password'],
                },
                include:[
                    {model: db.Allcode, as:'positionData',attributes:['valueEn','valueVi']},
                    {model: db.Allcode, as:'genderData',attributes:['valueEn','valueVi']},
                ],
                raw:true,
                nest:true
            });
            resolve({
                errCode:0,
                message:'get top doctor success',
                data:users,
            });
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopDoctorHome:getTopDoctorHome
}