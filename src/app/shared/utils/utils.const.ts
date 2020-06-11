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
    public static singleSpaProps: any = { };
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