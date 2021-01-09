import Mock from 'mockjs'
import data from './data'

Mock.mock('/sell/goods', {
    code: 200,
    success: true,
    data: data.goods
})
Mock.mock('/sell/ratings', {
    code: 200,
    success: true,
    data: data.ratings
})
Mock.mock('/sell/seller', {
    code: 200,
    success: true,
    data: data.seller
})