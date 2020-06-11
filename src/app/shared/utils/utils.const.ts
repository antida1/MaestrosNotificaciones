export class GlobalConstants {
    public static localeCalendar: any = {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"],
        dayNamesMin: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        clear: 'Limpiar'
    };
    public static singleSpaProps: any = {"authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsZGF2aWQiLCJlbWFpbCI6ImxkYXZpZEBwZXJzb25hbHNvZnQuY29tLmNvIiwianRpIjoiMWE3ZjlmYjctMDI5ZS00Nzc5LTg4MjMtNjgxNzVhNDhmMzY4Iiwic2lkIjoiYjA0Y2NmNTAtY2UzOS00MmI4LTg3MmQtZDdhYWNlYzJmZjliIiwiZmFtaWx5X25hbWUiOiJMaW5hIFBhdHJpY2lhIERhdmlkIEdvbnphbGV6IiwibGFzdF9sb2dpbl9kYXRlIjoiMTAvMDYvMjAyMCAwMzoyNDoyMCIsImRldmljZV9jbGllbnQiOiJzdHJpbmciLCJpcF9hZGRyZXNzX2NsaWVudCI6IjE3Mi4xOS41LjIxOCIsInJvbGVzIjoiW1wiYWRtaW5zbG9jYWxcIixcIkFuYWxpc3Rhc1wiXSIsImV4cCI6MTU5MTg4OTA2MCwiaXNzIjoicGVyc29uYWxzb2Z0LmNvbS5jbyIsImF1ZCI6InBlcnNvbmFsc29mdC5jb20uY28ifQ.m8X2utGF7jVPSULQUz3-SsvewpsRDgFEVHvDuNy1ZNg"};
    public static token: Function = () => {
        let token: string = "";

        try {
            if(typeof GlobalConstants.singleSpaProps["authToken"] !== "undefined") {
                if(GlobalConstants.singleSpaProps["authToken"].toLowerCase().indexOf("bearer") == -1) {
                    token = "Bearer " + GlobalConstants.singleSpaProps["authToken"];
                }
                else {
                    token = GlobalConstants.singleSpaProps["authToken"];
                }
            }
            else {
                token = localStorage.getItem(location.hostname);
            }
        }
        catch(e){
            token = null;
        }

        return token;
    }
}