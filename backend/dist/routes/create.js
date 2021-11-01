"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
/* GET users listing. */
var index = function (req, res) {
    var createSchedulesData = req.body;
    var days = createSchedulesData.schedule.split("\n");
    var initializeTableData = [];
    days.map(function (data) {
        initializeTableData.push([data, "0", "0", "0"]);
    });
    var tableDatas = {
        title: createSchedulesData.title,
        abstract: createSchedulesData.abstract,
        tableHeader: [
            "日程",
            "○",
            "△",
            "×"
        ],
        tableData: initializeTableData
    };
    console.log(tableDatas);
    res.send('respond with a resource');
};
exports.index = index;
