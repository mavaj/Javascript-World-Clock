/**
 * Copyright (c) 1978-2020 MAVAJ SUN CO, Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of MAVAJ SUN
 * CO, Inc. ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with MAVAJ SUN CO.
 *
 * THIS SOFTWARE IS PROVIDED "AS IS," WITHOUT A WARRANTY OF ANY KIND . ALL
 * EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
 * IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
 * NON-INFRINGEMENT, ARE HEREBY EXCLUDED. MAVAJ SUN CO AND ITS LICENSORS SHALL
 * NOT BE LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING ,
 * MODIFYING OR DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES. IN NO EVENT WILL
 * MAVAJ SUN CO OR ITS LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR
 * DATA,OR FOR DIRECT,INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING
 * OUT OF THE USE OF OR INABILITY TO USE SOFTWARE, EVEN IF SUN HAS BEEN ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGES.
 *
 * This software is not designed or intended for use in on-line control of
 * aircraft, air traffic, aircraft navigation or aircraft communications; or in
 * the design, construction, operation or maintenance of any nuclear facility.
 * Licensee represents and warrants that it will not use or redistribute the
 * Software for such purposes.
 *
 *
 * @author  : MavajSunCo
 * @Email   : info@MavajSunCo.com
 * @Website : www.MavajSunCo.com
 * @Date    : APR-28-2015
 * @version : 1.1
 *
 * @Decsriptoin : Privide Would Clock Time Zone Function , Pure JavaScript , No third party Library 
 */
        function worldClock(zone, region) {
            var dst = 0;
            var time = new Date();
            var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000);
            var gmtTime = new Date(gmtMS);
            var day = gmtTime.getDate();
            var month = gmtTime.getMonth();
            var year = gmtTime.getYear();
            if (year < 1000) {
                year += 1900;
            }
            var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
            if (year % 4 === 0) {
                monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
            }
            if (year % 100 === 0 && year % 400 !== 0) {
                monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
            }

            var hr = gmtTime.getHours() + zone;
            var min = gmtTime.getMinutes();
            var sec = gmtTime.getSeconds();

            if (hr >= 24) {
                hr = hr - 24;
                day -= -1;
            }
            if (hr < 0) {
                hr -= -24;
                day -= 1;
            }
            if (hr < 10) {
                hr = " " + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            if (day <= 0) {
                if (month === 0) {
                    month = 11;
                    year -= 1;
                }
                else {
                    month = month - 1;
                }
                day = monthDays[month];
            }
            if (day > monthDays[month]) {
                day = 1;
                if (month === 11) {
                    month = 0;
                    year -= -1;
                }
                else {
                    month -= -1;
                }
            }
            if (region === "NAmerica") {
                var startDST = new Date();
                var endDST = new Date();
                startDST.setMonth(3);
                startDST.setHours(2);
                startDST.setDate(1);
                var dayDST = startDST.getDay();
                if (dayDST !== 0) {
                    startDST.setDate(8 - dayDST);
                }
                else {
                    startDST.setDate(1);
                }
                endDST.setMonth(9);
                endDST.setHours(1);
                endDST.setDate(31);
                dayDST = endDST.getDay();
                endDST.setDate(31 - dayDST);
                var currentTime = new Date();
                currentTime.setMonth(month);
                currentTime.setYear(year);
                currentTime.setDate(day);
                currentTime.setHours(hr);
                if (currentTime >= startDST && currentTime < endDST) {
                    dst = 1;
                }
            }
            if (region === "Europe") {
                var startDST = new Date();
                var endDST = new Date();
                startDST.setMonth(2);
                startDST.setHours(1);
                startDST.setDate(31);
                var dayDST = startDST.getDay();
                startDST.setDate(31 - dayDST);
                endDST.setMonth(9);
                endDST.setHours(0);
                endDST.setDate(31);
                dayDST = endDST.getDay();
                endDST.setDate(31 - dayDST);
                var currentTime = new Date();
                currentTime.setMonth(month);
                currentTime.setYear(year);
                currentTime.setDate(day);
                currentTime.setHours(hr);
                if (currentTime >= startDST && currentTime < endDST) {
                    dst = 1;
                }
            }
            if (dst === 1) {
                hr -= -1;
                if (hr >= 24) {
                    hr = hr - 24;
                    day -= -1;
                }
                if (hr < 10) {
                    hr = " " + hr;
                }
                if (day > monthDays[month]) {
                    day = 1;
                    if (month === 11) {
                        month = 0;
                        year -= -1;
                    }
                    else {
                        month -= -1;
                    }
                }
                return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec + " DST";
            }
            else {
                return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec;
            }
        }

function worldClockZone() {
    document.getElementById("Dubai").innerHTML = worldClock(4, "Dubai");
    document.getElementById("Istanbul").innerHTML = worldClock(2, "Europe");
    document.getElementById("NewYork").innerHTML = worldClock(-5, "NAmerica");
    setTimeout("worldClockZone()", 1000);
}
window.onload = worldClockZone;

