import Product from "../models/products.model.js";
import User from "../models/users.model.js";

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
                    $gte: startDate,
                    $lte: endDate
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

    const dateArray = getDateInRange(startDate, endDate)

    return dateArray.map(date => {
        const foundData = dailySalesData.find(item => item._id === date)

        return {
            date,
            sales: foundData?.sales || 0,
            revenue: foundData?.revenue || 0
        }
    })
   } catch (error) {
        throw error
   }
}

const getDateInRange = async (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}