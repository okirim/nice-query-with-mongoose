import { Query, Document, } from 'mongoose';


type RequestQuery = { [key: string]: string|string[] }

export class FilterRequest<T extends Document<any, any>>{

    private excludedFields: string[] = ['page', 'sort', 'select'];


    constructor(public requestQuery: RequestQuery, public collection: Query<T[], T, {}> ) { }

    public filter() {
        const reqQuery = { ...this.requestQuery };
        //delete the excluded field from the Url
        this.excludedFields.forEach(el => delete reqQuery[el]);
        //add $ to (gt,gte,lt,lte) => ($gt,$gte,$lt,$lte)
        const queyString = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte)\b/g, matchResult => `$${matchResult}`);
        const collectionObject = JSON.parse(queyString);
        this.collection = this.collection.find(collectionObject);
        return this;
    }

    public sort(defaultVal: string = '') {
        if (this.requestQuery.sort) {
            let sortingBy = this.requestQuery.sort as string;
            //before: sort=price,difficulty 
            sortingBy = sortingBy.split(',').join(' ');
            //after: price difficulty

            this.collection = this.collection.sort(sortingBy);
        } else {
            this.collection = this.collection.sort(defaultVal);
        }
        return this
    }
    public select() {
        if (this.requestQuery.select) {
            //the selected fields
            let selectedFields = this.requestQuery.select as string;;

            // before select=price,qte 
            selectedFields = selectedFields.split(',').join(' ');
            //after price qte


            this.collection = this.collection.select(selectedFields);
        }
        else {

            this.collection = this.collection.select('-__v')

        }

        return this;

    }

    paginate(limit: number = 100) {
        //?page=2=>this page should contain from 11 to 20 

        const page: number = +this.requestQuery.page ?? 1;
        const skip: number = (page - 1) * limit;
        this.collection = this.collection.skip(skip).limit(limit);
        return this;

    }
}