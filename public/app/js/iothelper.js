function formattedDateDb(date) {
    var d = new Date(date || Date.now()),
        year = d.getFullYear(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();
        

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formattedDateRangetoDb(idate){
    var dyear = idate.slice(6,12);
    //console.log(dyear);
    var dday = idate.slice(3,5);
    //console.log(dday);
    var dmonth = idate.slice(0,2);
    //console.log(dmonth);

    return dyear + "-" + dmonth + "-" + dday;
}


function datasource_modcam_range(date, array, sex)
{
    var range_array = new Array();

    var dyear = date.slice(0,4);
    var dmonth = date.slice(5,7);
    var dday = date.slice(8,10);

    //console.log(dyear);
    //console.log(dmonth);
    //console.log(dday);
    
    var ihour = 0;
    var icounter = 0;
    var i = 0;


    for(ihour=0; ihour < 24; ihour++){	
        var adate = new Date(dyear, dmonth, dday, ihour, 0, 0, 0);
        var gotdata = false;

        for(icounter=0; icounter < array.length;icounter++){
            if(array[icounter].IHOUR == ihour){
                if(sex == 'f')
                    range_array.push({ time: adate, Female: parseInt(array[icounter].HEADCOUNT) });
                if(sex == 'm')
                    range_array.push({ time: adate, Male: parseInt(array[icounter].HEADCOUNT) });
                gotdata = true;
                break;
            }
        }

        if(!gotdata){
            if(sex == 'f')
               range_array.push({ time: adate, Female: 0 });
            if(sex == 'm')
                range_array.push({ time: adate, Male: 0 });
        }
    }

    return range_array;
}

function setTimeHour(date,hour){
    var dyear = date.slice(0,4);
    var dmonth = date.slice(5,7);
    var dday = date.slice(8,10);

    return new Date(dyear, dmonth, dday, hour, 0, 0, 0);
}

function processAgeChartDbDataSource(array){
    /*
    0: 0-4 years
    1: 5-9 years
    2: 10-14 years
    3: 15-19 years
    4: 20-24 years
    5: 25-29 years
    6: 30-34 years
    7: 35-39 years
    8: 40-44 years
    9: 45-49 years
    10: 50-54 years
    11: 55-59 years
    12: 60-64 years
    13: 65-69 years
    14: 70-74 years
    15: 75-79 years
    16: 80-84 years
    17: 85-89 years
    18: 90-94 years
    19: 95-* years
    */
    var m0 = 0, m1 = 0, m2 = 0; m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0, m9 = 0, m10 = 0, m11 = 0, m12 = 0, m13 = 0, m14 = 0, m15 = 0, m16 = 0, m17 = 0, m18 = 0, m19 = 0;
    var f0 = 0, f1 = 0, f2 = 0; f3 = 0, f4 = 0, f5 = 0, f6 = 0, f7 = 0, f8 = 0, f9 = 0, f10 = 0, f11 = 0, f12 = 0, f13 = 0, f14 = 0, f15 = 0, f16 = 0, f17 = 0, f18 = 0, f19 = 0;
    var ageChart_array = new Array();

    //if single result
    if(array != "" && !Array.isArray(array)){
        array = [array];
    }

    if(Array.isArray(array)){
        var icount = 0;
        //console.log("test");
        //console.log(array);
        for(icount = 0;icount < array.length;icount++){

            //sort base on age
            if(array[icount].AGE <= 4){
                if(array[icount].SEX == 'm')
                    m0++;
                else
                    f0++;
            }
            else if(array[icount].AGE >= 5 && array[icount].AGE <= 9){
                if(array[icount].SEX == 'm')
                    m1++;
                else
                    f1++;
            } else if(array[icount].AGE >= 10 && array[icount].AGE <= 14){
                if(array[icount].SEX == 'm')
                    m2++;
                else
                    f2++;
            } else if(array[icount].AGE >= 15 && array[icount].AGE <= 19){
                if(array[icount].SEX == 'm')
                    m3++;
                else
                    f3++;
            } else if(array[icount].AGE >= 20 && array[icount].AGE <= 24){
                if(array[icount].SEX == 'm')
                    m4++;
                else
                    f4++;
            } else if(array[icount].AGE >= 25 && array[icount].AGE <= 29){
                if(array[icount].SEX == 'm')
                    m5++;
                else
                    f5++;
            } else if(array[icount].AGE >= 30 && array[icount].AGE <= 34){
                 if(array[icount].SEX == 'm')
                    m6++;
                else
                    f6++;
            } else if(array[icount].AGE >= 35 && array[icount].AGE <= 39){
                if(array[icount].SEX == 'm')
                    m7++;
                else
                    f7++;
            } else if(array[icount].AGE >= 40 && array[icount].AGE <= 44){
                if(array[icount].SEX == 'm')
                    m8++;
                else
                    f8++;
            } else if(array[icount].AGE >= 45 && array[icount].AGE <= 49){
                if(array[icount].SEX == 'm')
                    m9++;
                else
                    f9++;
            } else if(array[icount].AGE >= 50 && array[icount].AGE <= 54){
                if(array[icount].SEX == 'm')
                    m10++;
                else
                    f10++;
            } else if(array[icount].AGE >= 55 && array[icount].AGE <= 59){
                if(array[icount].SEX == 'm')
                    m11++;
                else
                    f11++;
            } else if(array[icount].AGE >= 60 && array[icount].AGE <= 64){
                if(array[icount].SEX == 'm')
                    m12++;
                else
                    f12++;
            } else if(array[icount].AGE >= 65 && array[icount].AGE <= 69){
                if(array[icount].SEX == 'm')
                    m13++;
                else
                    f13++;
            } else if(array[icount].AGE >= 70 && array[icount].AGE <= 74){
                if(array[icount].SEX == 'm')
                    m14++;
                else
                    f14++;
            } else if(array[icount].AGE >= 75 && array[icount].AGE <= 79){
                if(array[icount].SEX == 'm')
                    m15++;
                else
                    f15++;
            } else if(array[icount].AGE >= 80 && array[icount].AGE <= 84){
                if(array[icount].SEX == 'm')
                    m16++;
                else
                    f16++;
            } else if(array[icount].AGE >= 85 && array[icount].AGE <= 89){
                if(array[icount].SEX == 'm')
                    m17++;
                else
                    f17++;
            } else if(array[icount].AGE >= 90 && array[icount].AGE <= 94){
                if(array[icount].SEX == 'm')
                    m18++;
                else
                    f18++;
            } else if(array[icount].AGE >= 95){
                if(array[icount].SEX == 'm')
                    m19++;
                else
                    f19++;
            }

        }
        //var dataSource = [{range: "0-4", male: 423.721, female: 1}]
        
        
        ageChart_array.push({range: "0-4", male: m0, female: f0});
        ageChart_array.push({range: "5-9", male: m1, female: f1});
        ageChart_array.push({range: "10-14", male: m2, female: f2});
        ageChart_array.push({range: "15-19", male: m3, female: f3});
        ageChart_array.push({range: "20-24", male: m4, female: f4});
        ageChart_array.push({range: "25-29", male: m5, female: f5});
        ageChart_array.push({range: "30-34", male: m6, female: f6});
        ageChart_array.push({range: "35-39", male: m7, female: f7});
        ageChart_array.push({range: "40-44", male: m8, female: f8});
        ageChart_array.push({range: "45-49", male: m9, female: f9});
        ageChart_array.push({range: "50-54", male: m10, female: f10});
        ageChart_array.push({range: "55-59", male: m11, female: f11});
        ageChart_array.push({range: "60-64", male: m12, female: f12});
        ageChart_array.push({range: "65-69", male: m13, female: f13});
        ageChart_array.push({range: "70-74", male: m14, female: f14});
        ageChart_array.push({range: "75-79", male: m15, female: f15});
        ageChart_array.push({range: "80-84", male: m16, female: f16});
        ageChart_array.push({range: "85-89", male: m17, female: f17});
        ageChart_array.push({range: "90-94", male: m18, female: f18});
        ageChart_array.push({range: "95++", male: m19, female: f19});
    }

    return ageChart_array;
}

function processMoodChartDbDataSource(array){
    /*
    0: 0-20 years
    1: 21-40 years
    2: 41-60 years
    3: 61-80 years
    4: 81* years
    */
    var m0 = new Array(5), m1 = new Array(5), m2 = new Array(5), m3 = new Array(5), m4 = new Array(5);
    var f0 = new Array(5), f1 = new Array(5), f2 = new Array(5), f3 = new Array(5), f4 = new Array(5);
    
    var moodChart_array = new Array();
    var icount = 0;
    
    //if single result
    if(array != "" && !Array.isArray(array)){
        array = [array];
    }

    if(Array.isArray(array)){
        var total_count = array.length;
        //console.log("test");
        //console.log(array);

        //initialize array
        for(icount = 0;icount < m0.length;icount++){
            m0[icount] = m1[icount] = m2[icount] = m3[icount] = m4[icount] = 0;
            f0[icount] = f1[icount] = f2[icount] = f3[icount] = f4[icount] = 0;
        }

        for(icount = 0;icount < array.length;icount++){

            //sort base on age
            if(array[icount].AGE <= 20){
                if(array[icount].SEX == 'm')
                    m0[array[icount].MOOD - 1] = m0[array[icount].MOOD - 1] + 1;
                else
                    f0[array[icount].MOOD - 1] = f0[array[icount].MOOD - 1] + 1;
            } else if(array[icount].AGE >= 21 && array[icount].AGE <= 40){
                if(array[icount].SEX == 'm')
                    m1[array[icount].MOOD - 1] = m1[array[icount].MOOD - 1] + 1;
                else
                    f1[array[icount].MOOD - 1] = f1[array[icount].MOOD - 1] + 1;
            } else if(array[icount].AGE >= 41 && array[icount].AGE <= 60){
                if(array[icount].SEX == 'm')
                    m2[array[icount].MOOD - 1] = m2[array[icount].MOOD - 1] + 1;
                else
                    f2[array[icount].MOOD - 1] = f2[array[icount].MOOD - 1] + 1;
            } else if(array[icount].AGE >= 61 && array[icount].AGE <= 80){
                if(array[icount].SEX == 'm')
                    m3[array[icount].MOOD - 1] = m3[array[icount].MOOD - 1] + 1;
                else
                    f3[array[icount].MOOD - 1] = f3[array[icount].MOOD - 1] + 1;
            } else if(array[icount].AGE >= 81){
                if(array[icount].SEX == 'm')
                    m4[array[icount].MOOD - 1] = m4[array[icount].MOOD - 1] + 1;
                else
                    f4[array[icount].MOOD - 1] = f4[array[icount].MOOD - 1] + 1;
            } 
        }
        //var dataSource = [{range: "0-4", male: 423.721, female: 1}]
        //{ malerange: "0-4", malemood: 3, maleperc: 12, maletag: "male"}

        for(icount = 0;icount < m0.length;icount++){
            if(m0[icount] > 0){
                moodChart_array.push({malerange: "00-20", malemood: icount+1, maleperc: m0[icount]/total_count, maletag: "male"});
            } 
            if(f0[icount] > 0){
                moodChart_array.push({femalerange: "00-20", femalemood: icount+1, femaleperc: f0[icount]/total_count, femaletag: "female"});
            }
        }

        for(icount = 0;icount < m0.length;icount++){
            if(m1[icount] > 0){
                moodChart_array.push({malerange: "21-40", malemood: icount+1, maleperc: m1[icount]/total_count, maletag: "male"});
            } 
            if(f1[icount] > 0){
                moodChart_array.push({femalerange: "21-40", femalemood: icount+1, femaleperc: f1[icount]/total_count, femaletag: "female"});
            } 
        }

        for(icount = 0;icount < m0.length;icount++){
            if(m2[icount] > 0){
                moodChart_array.push({malerange: "41-60", malemood: icount+1, maleperc: m2[icount]/total_count, maletag: "male"});
            } 
            if(f2[icount] > 0){
                moodChart_array.push({femalerange: "41-60", femalemood: icount+1, femaleperc: f2[icount]/total_count, femaletag: "female"});
            } 
        }

        for(icount = 0;icount < m0.length;icount++){
            if(m3[icount] > 0){
                moodChart_array.push({malerange: "61-80", malemood: icount+1, maleperc: m3[icount]/total_count, maletag: "male"});
            } 
            if(f3[icount] > 0){
                moodChart_array.push({femalerange: "61-80", femalemood: icount+1, femaleperc: f3[icount]/total_count, femaletag: "female"});
            } 
        }

        for(icount = 0;icount < m0.length;icount++){
            if(m4[icount] > 0){
                moodChart_array.push({malerange: "81++", malemood: icount+1, maleperc: m4[icount]/total_count, maletag: "male"});
            } 
            if(f4[icount] > 0){
                moodChart_array.push({femalerange: "81++", femalemood: icount+1, femaleperc: f4[icount]/total_count, femaletag: "female"});
            } 
        }
        
        //ageChart_array.push({range: "0-4", male: m0, female: f0});
    }
   
    console.log(moodChart_array);
    return moodChart_array;
}

function processGlassesDbDataSource(array){
    
    var glassesChart_array = new Array();
    var icount = 0;
  
    //{type: "Glasses", val: 1}
    console.log("Glasses : " + array.TOTAL_GLASSES);
    
    try{
        if(!(array.TOTAL_GLASSES === null)){
            glassesChart_array.push({type: "Glasses", val: parseInt(array.TOTAL_GLASSES)});
            glassesChart_array.push({type: "No Glasses", val: array.TOTAL_COUNT - array.TOTAL_GLASSES});
        } else if (!(array.TOTAL_COUNT === null)){
            glassesChart_array.push({type: "No Glasses", val: parseInt(array.TOTAL_COUNT)});
        }
    }
    catch(err){
        console.log(err);
    }
        
    
    console.log(glassesChart_array);
    return glassesChart_array;
}

/*
function emptydatasource_modcam_range(date, sex)
{
    var range_array = new Array();

    var dyear = date.slice(0,4);
    var dmonth = date.slice(5,7);
    var dday = date.slice(8,10);

    //console.log(dyear);
    //console.log(dmonth);
    //console.log(dday);
    
    var ihour = 0;
    var icounter = 0;
    var i = 0;


    for(ihour=0; ihour < 24; ihour++){	
        var adate = new Date(dyear, dmonth, dday, ihour, 0, 0, 0);

        if(sex == 'f')
            range_array.push({ time: adate, Female: 0 });
        if(sex == 'm')
            range_array.push({ time: adate, Male: 0 });
    }

    return range_array;
}
*/
//{ time: new Date("December 05, 2014 18:00:00"), reqs: 107 },