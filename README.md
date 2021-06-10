
#### query 
`'/api/products?select=name,price,qte&page=2&limit=10&sort=-price&qte[gt]=1'`

`example : with express`
```
const getProducts= (req,res,next)=>{
const filterProducts = new FilterRequest(
        { ...req.query },
        Product.find({})
      );
        filterProducts
        .filter()
        .sort()
        .select()
        .paginate(10);
      const products = await productsFiltered.collection;
      ...
}
```
`example 2 : with nextjs`
```
export default (req,res)=>{
const filterProducts = new FilterRequest(
        { ...req.query },
        Product.find({})
      );
        filterProducts
        .filter()
        .sort()
        .select()
        .paginate(10);
      const products = await productsFiltered.collection;
      ...
}
```
