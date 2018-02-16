var jsondata, Request, responseRet,vm;
responseRet = function(response_object) {
    return JSON.parse(response_object.responseText);
}

Request = new XMLHttpRequest();
Request.open('GET', '//admixercloudcreatives.blob.core.windows.net/supportdir/blob/Maks/jn/simple_test_work/js/test.json', true);
Request.send();
Request.onreadystatechange = function() {

    if (Request.readyState != 4) {
        return;
    }

    jsondata = responseRet(Request);
    vm = new Vue({
        el: '#wrapper',
        data: {
            search: '',
            sortParam: '',
            items: jsondata,
        },
        computed: {
            filteredList: function () {
                var s = this.search.toLowerCase();
                var st = this.sortParam;
                if (st !== '') {
                    switch (this.sortParam) {
                        case 'name':
                            this.items = this.items.sort(sortByName);
                            break;
                        case 'location':
                            this.items = this.items.sort(sortByLocation);
                            break;
                        case 'currency':
                            this.items = this.items.sort(sortByCurrency);
                            break;
                        default:
                            break;
                    }
                }


                return this.items.filter(function (elem) {
                    if (s === '') return true;
                    else return elem.name.toLowerCase().indexOf(s) > -1;
                })
            },
            totalCurrent: function () {
                var ob = this.filteredList;
                console.log(ob);
                var cur = 0;
                console.log(ob.length);

                for (var i = 0; i < ob.length; i++) {
                    cur = cur + Number(ob[i].currency);
                    console.log(ob[i].currency);
                }
                return cur;


            }
        }
    })
    var sortByName = function (e1, e2) {
        return e1.name.localeCompare(e2.name);
    };
    var sortByLocation = function (e1, e2) {
        return e1.location.localeCompare(e2.location);
    };
    var sortByCurrency = function (e1, e2) {
        return e1.currency - e2.currency
    };
}

