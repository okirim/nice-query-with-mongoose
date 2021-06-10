### install
```
npm i nice-query
```
### Handle query 
```
example uri :  
'/api/products?select=name,price,qte&page=2&sort=-price&quantity[gt]=0'
```

```
select fields : select=field1,field2 
ex: select=name,price

```
```
page : page=pageNumber
ex: page=2

```
```
sort by : sort=(+ or -)fieldName
ex: sort=+price (asc)
ex2 : sort=-price (desc)

```
```
select where : fliedName[gt,lt,gte,lte]=value 
quantity[gt]=0

```

#### example 1 : with express
``` 
import FilterRequest from 'nice-query';

const getProducts= (req,res,next)=>{

const filterProducts = new FilterRequest({ ...req.query },Product.find({}))
                          .filter()
                          .sort()
                          .select()
                          .paginate(10);

const products = await filterProducts.collection;
      ...
}
```
#### example 2 : with nextjs
```
import FilterRequest from 'nice-query';

export default (req,res)=>{
const filterProducts = new FilterRequest({ ...req.query },Product.find({}))
                          .filter()
                          .sort()
                          .select()
                          .paginate(10);
       
const products = await filterProducts.collection;
      ...
}
```

#### example 3 : with typescript

```
...
const filterProducts = new FilterRequest<ProductsDocument>(

        { ...req.query },
        Product.find({})
       ).filter()
        .sort()
        .select()
        .paginate(10);


 const products = await filterProducts.collection;
...      
      
```