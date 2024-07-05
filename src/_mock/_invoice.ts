import { sub } from 'date-fns';
import {_mock} from './_mock'

export const INVOICE_STATUS_OPTIONS = [{value:'',label:''}]

const customer1 = {
    id: _mock.id(2),
    name: _mock.fullName(2),
    email: _mock.email(2),
    avatarUrl: '/assets/images/avatar_14.jpg',
    ipAddress: '192.158.1.38',
}
const customer2 = {
    id: _mock.id(1),
    name: _mock.fullName(1),
    email: _mock.email(1),
    avatarUrl: '/assets/images/avatar_14.jpg',
    ipAddress: '192.158.1.38',
}

export const _invoices =[{
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
    invoiceNumber: '#6012',
    createdAt: sub(new Date(), { days: 2, hours: 2 }),
    expiredAt: sub(new Date(), { days: 4, hours: 4 }),
    customer: customer1,
    totalQuantity: 3,
    totalAmount: 40000000,

},
{
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
    invoiceNumber: '#6013',
    createdAt: sub(new Date(), { days: 3, hours: 5 }),
    expiredAt: sub(new Date(), { days: 4, hours: 4 }),
    customer: customer2,
    totalQuantity: 4,
    totalAmount: 70000000,

}
];
// const _invoices = [...Array(20)].map((_,index)=>{
//     return {
        
//     }
// })
