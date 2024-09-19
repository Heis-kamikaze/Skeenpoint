import Product from "../models/products.model.js";
import User from "../models/users.model.js";
import Order from './../models/order.model.js';

export const getAnalyticsData = async() => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ])

    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0};

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }
};

export const getDailySalesData = async (startDate, endDate) => {
   try {
    const dailySalesData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date (startDate),
                    $lte: new Date (endDate)
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])

    const dateArray = await getDateInRange(startDate, endDate)


    return dateArray.map(date => {
         // Format the date to match the _id format (YYYY-MM-DD)
      const formattedDate = date.toISOString().split('T')[0]; // '2024-09-18'
        const foundData = dailySalesData.find(item => item._id === formattedDate)

        return {
            date: formattedDate,
            sales: foundData?.totalSales || 0,
            revenue: foundData?.totalRevenue || 0
        }
    })
   } catch (error) {
        throw error
   }
}

const getDateInRange = async (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate <= new Date(endDate)) {
         // Format the date to "YYYY-MM-DD" to match the format in the aggregation result
    const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(new Date(formattedDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}