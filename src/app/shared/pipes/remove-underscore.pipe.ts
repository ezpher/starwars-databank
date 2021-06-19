import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'removeUnderscore'})
export class RemoveUnderscorePipe implements PipeTransform {
    transform(input: string) : string {
        return input.replace(/_/g, ' ');
    }
}