<h1 align="center">Welcome to </h1>
<div align="center">
<img alt="logo" src="./client/src/assets/Screenshot 2021-11-04 at 11.35.05.png" />
</div>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

## Timeframe
<p>9 Days</p>

## Goal
<p>To build a full-stack application, using a Django back-end, consuming it with a separate front-end built with React. The application needed to have at least one OneToMany & one ManyToMany relationship.</p>

### ❓ What is Candy Island?
<p>Candy Island is an anonymous consumer-to-consumer e-commerce website, selling sweets/candy that incorporates crypto currency as it’s method of payment. Built with an extensive back end using Django with all required relationships for future development and features. Front end was built using React, users can browse listings, order items, and leave reviews as buyers. As vendors, users can add new listings for sale and manage orders and it’s status.
</p>

## ✨ [Demo Candy Island](https://candy-island.herokuapp.com/)

<div align="center">
<img alt="opening screen" src="./client/src/assets/Kapture 2021-11-04 at 14.44.39.gif" />
</div>

### 💾 Technologies Used
<li>HTML5</li>
<li>CSS3</li>
<li>SASS</li>
<li>Javascript ES6</li>
<li>React</li>
<li>Django</li>
<li>Python</li>
<li>Yarn</li>
<li>Cloudinary</li>
<li>Insomnia</li>
<li>Git</li>
<li>Github</li>
<li>Chrome dev tools</li>


## 🚀 Approach

<h4>Day 1</h4>
<li>Did a lot of planning with already a lot of pre planning done the weekend before thinking through what my project would be based on</li>
<li>I mapped out all my models, including all fields I planned to use and relationships specified</li>

```
class Listing(models.Model):
    name = models.CharField(max_length=50, default=None)
    image = models.CharField(max_length=300, default=None)
    ships_to = models.CharField(max_length=50, default=None)
    quantity = models.PositiveIntegerField(default=None)
    description = models.TextField(max_length=500, default=None)
    price = models.DecimalField(decimal_places=2, max_digits=7, default=0.00)
    weight = models.PositiveIntegerField(default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'listings',
        on_delete = models.CASCADE
    )
    categories = models.ManyToManyField(
        'categories.Category',
        related_name = 'listings',
    )

    def __str__(self):
        return f"{self.name} - {self.price}"
```
<li>A rough framework of the frontend was also built to identify the different endpoints required</li>
<li>Started working on the backend, listing out apps required, and relationships between them</li>
<li>Built a majority using insomnia to test as I went along</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/Screenshot 2021-11-04 at 14.31.44.png" />
</div>

<h4>Day 2</h4>
<li>One feature I deinitely wanted to add was the time that the user is logged in for, I did this by creating a variable that would change the timedelta in the authentication</li>
<li>Finished building the backend, adding the last profile route which would allow request of the users detail with the need of their pk.</li>

```
class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def get_profile(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="Profile not found")
    
    def get(self, request):
        serialized_profile = PopulatedUserSerializer(request.user)
        print(serialized_profile.data)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)

    def put(self, request):
        Updated_serialized_profile = PopulatedUserSerializer(request.user, data=request.data)
        if Updated_serialized_profile.is_valid():
            Updated_serialized_profile.update()
            
            return Response(Updated_serialized_profile.data, status=status.HTTP_202_ACCEPTED)
        print(Updated_serialized_profile.data)
        return Response(Updated_serialized_profile.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

<li>Started working on the front-end, planning out the componenets that would be required.</li>
<li>Due to the scope of what I had planned including the features, I decided to employ botstrap framework to work with to ensure the project had basic styling</li>
<li>I started with building the auth components, including Login, Register, SecureRoute for which would check if user was authenticated routing them to either the log in or home page.</li>
<li>Also built some common components including the Header, Navbar, and Footer to give the app some life and be able to interactive with it.</li>
<li>I seeded some information to work with  and to visualise properly how it would look</li>



<h4>Day 3</h4>
<li>Started working on the homepage, linking SecureRoute and the login page</li>

```
const SecureRoute = () => {

  const location = useLocation()

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])

  userIsAuthenticated()
  return userIsAuthenticated() ?  <Home /> : <Login />
}

export default SecureRoute
```

<li>I added 4 random listings for the homepage, also having categories shown on the side.</li>

```
{listings.length > 0 &&
              listings.sort(() => 0.5 - Math.random()).slice(0, 4).map(listing => {
                return <div key={listing.id} className="card mb-4 listing-card shadow">
                  <Link to={`/search/${listing.id}`}><img className="card-img-top" src={listing.image} alt="..." /></Link>
                  <div className="card-body">
                    <h2 className="card-title h4 fw-bolder-color">{listing.name}</h2>
                    <p className="small">Sold by {listing.owner.username}</p>
                    <p className="card-text">{listing.description.substring(0, 200)}...</p>
                    <h3>£{listing.price}</h3>
                    <Link className="btn btn-primary" to={`/search/${listing.id}`}>View Listing</Link>
                  </div>
                </div>
              })
            }
```
<li>Added a search input as a route to the the search/listing index page which would show all available listings alphabetically</li>
<li>Built the search/index page component with a paginate to limit the listings to the 5 per page</li>
<li>Added the search functionality in tandem with filters</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/Kapture 2021-11-04 at 14.55.23.gif" />
</div>

<h4>Day 4/5 - Weekend</h4>
<li>Worked on the single listing page, where the user could view listing details, buy, or leave feedback</li>
<li>Used this time to add necessary styling</li>
<li>Utlised react-tabs package to show description, feedback, and weight</li>
<li>Added react-starts to show average rating received for listings</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/Single.gif" />
</div>

<h4>Day 6</h4>
<li>Added an order modal to take care of ordering function and not take them away from the listing page</li>
<li>created  vendor modal also on the hoemscreen which would be prompted if a user clicked the become a vendor link in the navbar</li>
<li>Created a vendor page with tabs, including an add a listing tab, current orders received</li>

<h4>Day 7</h4>
<li>Created orders page with tabs, adding an order confirmation page showing a summary of the order, order status where the status of order can be changed, and a conversation section where the buyer and vendor would message each other in regards to a particular order</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/order.gif" />
</div>

<h4>Day 8</h4>
<li>Created profile page to allow user change their details if required</li>
<li>Using tabs, we're showing pending, shipped, and completed orders</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/profile.gif" />
</div>

<h4>Day 9</h4>
<li>General fixing of components and finding bugs affecting user experience</li>
<li>Adding feature of categories section on home page where category would take user to a list of candies in that category.12</li>

<div align="center">
<img alt="opening screen" src="./client/src/assets/category.gif" />
</div>

## Difficulties
<li>Getting the list of vendors orders to show on the vendor page, through trial and error I eventually managed to get it to work</li>

```
{
        listings.length > 0 &&
        listings.map(listing => {
          return listing.orders.slice(offset, offset + perPage).map(order => {
            console.log('Order ->', order)
            return <div key={order.id} className="card mb-4 order-card shadow p-3 flex-direction-row">
              <div className="card-body">
                <div className="small text-muted">Order created at {order.created_at}</div>
                <h2 className="card-title h4">Order #{order.id}</h2>
                <p className="card-text">Quantity: {order.quantity}</p>
                <p className="card-text">{order.listing.name}</p>
                <p className="card-text text-success">{order.status}</p>
                <Link className="btn btn-primary" to={`/orders/${order.id}`}>View order</Link>
              </div>
              <div>
                <img src={order.listing.image} alt={order.listing.image} />
              </div>
            </div>
          })
        })
      }
```

<li>General scope of the project, it was hard to keep on adding features and work on it bit by bit</li>
<li>Error handling was difficult compared to group projects where it would have been quicker</li>
<li>The endurance to keep it going by the end of the project, making necessary tweak to improve the ux</li>
<li>Profile being able to edit their profiles via become a vendor link and profile page wasn't able to be done due to the way in which django worked, but still researching this</li>

## Wins
<li>Completing a full-stack project solo with the features planned through</li>
<li>Getting the list of vendors orders to show on the vendor page</li>
<li>Getting the messaging app to work in realtime, allow buyers and vendors to communicate via the order</li>
<li>Adding the order component to actually have the app be able to work in practice without the need of a payment gateway</li>

## Author

👤 **Jason Abimbola**

* Github: [@JoinSamBalboa](https://github.com/JoinSamBalboa)
* LinkedIn: [@JoinSamBalboa](https://linkedin.com/in/joinsambalboa)
* Portfolio: [@JoinSamBalboa](https://www.joinsambalboa.com)