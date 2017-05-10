
const url = 'http://192.168.0.33/AYSAPI/api/';
// const url = 'http://aiyushou.ngrok.cc/AYSAPI/api/';

module.exports = {
    categoryTCode: '0',
    categoryNum: '20',
    commodityByStationSize: '5',
    pageNum: '3',
    apiList: {
        loginToken: url + 'Account/wxsm_Login',
        category: url + 'Home_Page/CommodityType_Lists',
        topLine: url + 'Home_Page/Get_NewsLists',
        commodity: url + 'Home_Page/Get_CommodityModel',
        station: url + 'Supply_Station/Get_TerminalMdoel',
        commodityByStation: url + 'Supply_Station/Get_CommodityModelfromTerminal',
        selectStation: url + 'Supply_Station/Get_Termina_List',
        orderInfo: url + 'User_Order_Information/Get_CommodityModel',
        ordering: url + 'User_Order_Information/Add_OrderInformation',
        orders: url + 'MyMessage/Get_OrdersFromUserMessage',
        myOrderNum: url + 'MyMessage/My_Order',
        orderPay: url + 'WeChatPayment/WeChatPaidByOrder',
        mySaleOrder: url + 'MyMessage/Get_OrderFromUser',
        delMySaleOrder: url + 'MyMessage/Delete_OrderByCommCode',
        openStationDoor: url + 'WMJ/WMJ_Message',
    }
}