angular
    .module('test', ['JSONView', 'ngSanitize'])
    .controller('test', function () {
        this.json = `{
    "Server": "Des",
    "Id": "57ea17b6e280e722d08c8855",
    "Type": "Start",
    "Msg": "UpdateCarStateAsync",
    "Utc": "2016-09-27T06:54:50.722Z",
    "a": true,
    "a": 1,
    "a": 2,
    "a": null,
    "Info": {
        "value": {
            "InfoObject": {
                "Info": {
                    "__logId": "700d181a-dbf6-4153-8817-15d4caf2dc68",
                    "__references": [],
                    "changes": {
                        "CarStates": {
                            "28845ae0-f1b7-11e5-8b37-df6c83c91fda": {
                                "DriverId": "35f46c29-aaa3-486b-948c-d33b1ee236a3",
                                "LastValidCoordinateUtc": "2016-09-24T13:48:08",
                                "LastPingUtc": "2016-09-27T06:54:41.2336979Z",
                                "Latitude": 47.0532405,
                                "Longitude": 28.840079,
                                "AvgSpeed": 1,
                                "Direction": 156
                            },
                            "fef24a1e-b8fa-4154-8aa1-b651e5731dac": {
                                "DriverId": "8c038197-de92-475f-a69b-13dabaca9cb6",
                                "LastValidCoordinateUtc": "2016-09-27T06:54:40",
                                "LastPingUtc": "2016-09-27T06:54:43.234003Z",
                                "Latitude": 46.9900363,
                                "Longitude": 28.8516069,
                                "AvgSpeed": 30,
                                "Direction": 136
                            },
                            "6fc7bb89-8103-4be6-a73c-0cd7c963d34a": {
                                "DriverId": "49731849-f849-4ef6-be12-1a8ba8288143",
                                "LastValidCoordinateUtc": "2016-09-27T06:54:55",
                                "LastPingUtc": "2016-09-27T06:54:44.2806187Z",
                                "Latitude": 47.0341397,
                                "Longitude": 28.8183023,
                                "AvgSpeed": 45,
                                "Direction": 314
                            },
                            "fbdbaf8c-64a7-4f61-83b1-282e3191bb1d": {
                                "DriverId": "adad0c1e-0a37-4b95-8491-5d8aaa53a915",
                                "LastValidCoordinateUtc": "2016-09-27T06:54:37",
                                "LastPingUtc": "2016-09-27T06:54:41.2336979Z",
                                "Latitude": 47.0388283,
                                "Longitude": 28.8364333,
                                "AvgSpeed": 0,
                                "Direction": 0
                            }
                        }
                    },
                    "logger": {
                        "References": [],
                        "Settings": {
                            "Writers": [
                                {}
                            ]
                        },
                        "LogId": "700d181a-dbf6-4153-8817-15d4caf2dc68",
                        "Categories": []
                    }
                }
            }
        }
    },
    "LogId": "700d181a-dbf6-4153-8817-15d4caf2dc68",
    "Categories": [
        "TransportLayer",
        "Taxi.Dispatcher.Desktop.exe"
    ],
    "MemberName": "",
    "FileName": "",
    "LineNumber": 0,
    "References": [
        "700d181a-dbf6-4153-8817-15d4caf2dc68",
        "35f46c29-aaa3-486b-948c-d33b1ee236a3",
        "8c038197-de92-475f-a69b-13dabaca9cb6",
        "49731849-f849-4ef6-be12-1a8ba8288143",
        "adad0c1e-0a37-4b95-8491-5d8aaa53a915"
    ],
    "TimeIndex": 1609270654
}`;

        this.options = {
            beforeParse(ast){
                if (ast.type === 'property') {
                    if (ast.key.value === 'LogId') {
                        ast.value.type = 'html';
                        ast.value.value = `<a href="#${ast.value.value}">${ast.value.value}</a>`;
                    }
                }
                return ast;
            }
        };
    });