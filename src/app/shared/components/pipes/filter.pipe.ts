import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filter'
})
export class FilterPipe implements PipeTransform{
    
    transform(value: any, arg: any) {
        const resultFilter = [];
        for(const result  of value){
            if(result.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
                resultFilter.push(result);
            }
        }
        return resultFilter;
    }


}