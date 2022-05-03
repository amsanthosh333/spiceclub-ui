import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { BestsellersComponent } from './products/bestsellers/bestsellers.component';


const routes: Routes = [
  { path :'', redirectTo:'/home',pathMatch:'full'},

  // { path :'login',component:LoginComponent},
  { path :'home',component:HomeComponent},
  { path :'login',component:LoginComponent},
  { path :'header',component:HeaderComponent},
 
  { path :'bestseller',component:BestsellersComponent},
  { path: 'bestselling', loadChildren: () => import('./products/bestselling/bestselling.module').then(m => m.BestsellingModule) },
  { path: 'shopbyproduct/brand/:id', loadChildren: () => import('./products/shopbyproduct/shopbyproduct.module').then(m => m.ShopbyproductModule) },
  { path: 'shopbyproduct', loadChildren: () => import('./products/shopbyproduct/shopbyproduct.module').then(m => m.ShopbyproductModule) },
 
  { path: 'shopbyproduct/:key', loadChildren: () => import('./products/shopbyproduct/shopbyproduct.module').then(m => m.ShopbyproductModule) },
  { path: 'productdetail/:id', loadChildren: () => import('./products/productdetail/productdetail.module').then(m => m.ProductdetailModule) },
  { path: 'wishlist', loadChildren: () => import('./profiledetails/wishlist/wishlist.module').then(m => m.WishlistModule),canActivate: [AuthGuard], },
  { path: 'cart', loadChildren: () => import('./profiledetails/cart/cart.module').then(m => m.CartModule) ,canActivate: [AuthGuard],},
  { path: 'checkout', loadChildren: () => import('./profiledetails/checkout/checkout.module').then(m => m.CheckoutModule),canActivate: [AuthGuard], },
  { path: 'blog', loadChildren: () => import('./products/blog/blog.module').then(m => m.BlogModule) },
  { path: 'blog/:id', loadChildren: () => import('./products/blog/blog.module').then(m => m.BlogModule) },
  { path: 'recipe', loadChildren: () => import('./products/recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'recipe/:id', loadChildren: () => import('./products/recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'recipe/:id/:page/:categories', loadChildren: () => import('./products/recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'brands/:id', loadChildren: () => import('./products/brands/brands.module').then(m => m.BrandsModule) },
   { path: 'brands/:id/:page', loadChildren: () => import('./products/brands/brands.module').then(m => m.BrandsModule) },
  { path: 'flash', loadChildren: () => import('./products/flash/flash.module').then(m => m.FlashModule) },
  { path: 'category/:id', loadChildren: () => import('./products/category/category.module').then(m => m.CategoryModule) },
  { path: 'subcategory/:id', loadChildren: () => import('./products/category/category.module').then(m => m.CategoryModule) },
  { path: 'category', loadChildren: () => import('./products/category/category.module').then(m => m.CategoryModule) },
  
 
  { path: 'daydeal', loadChildren: () => import('./products/daydeal/daydeal.module').then(m => m.DaydealModule) },
  { path: 'monthdeal', loadChildren: () => import('./products/monthdeal/monthdeal.module').then(m => m.MonthdealModule) },
  { path: 'orders', loadChildren: () => import('./profiledetails/orders/orders.module').then(m => m.OrdersModule),canActivate: [AuthGuard] },
  { path: 'orders/:page', loadChildren: () => import('./profiledetails/orders/orders.module').then(m => m.OrdersModule),canActivate: [AuthGuard] },
  { path: 'orders/:page/:delivery/:payment', loadChildren: () => import('./profiledetails/orders/orders.module').then(m => m.OrdersModule),canActivate: [AuthGuard] },
  { path: 'orderdetail/:id', loadChildren: () => import('./profiledetails/orderdetail/orderdetail.module').then(m => m.OrderdetailModule),canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./profiledetails/profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard] },
  { path: 'wallet', loadChildren: () => import('./profiledetails/wallet/wallet.module').then(m => m.WalletModule),canActivate: [AuthGuard] },
  { path: 'blogdetails/:id', loadChildren: () => import('./products/blogdetails/blogdetails.module').then(m => m.BlogdetailsModule) },
  { path: 'recipedetails/:id', loadChildren: () => import('./products/recipedetails/recipedetails.module').then(m => m.RecipedetailsModule) },
  { path: 'address', loadChildren: () => import('./profiledetails/address/address.module').then(m => m.AddressModule),canActivate: [AuthGuard] },
  { path: 'message', loadChildren: () => import('./profiledetails/message/message.module').then(m => m.MessageModule),canActivate: [AuthGuard] },
  { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
  { path: 'purchased', loadChildren: () => import('./profiledetails/purchased/purchased.module').then(m => m.PurchasedModule),canActivate: [AuthGuard] },
  { path: 'todaysdeal', loadChildren: () => import('./products/todaysdeal/todaysdeal.module').then(m => m.TodaysdealModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'orderstrack', loadChildren: () => import('./pages/orderstrack/orderstrack.module').then(m => m.OrderstrackModule) },
  { path: 'storelocation', loadChildren: () => import('./pages/storelocation/storelocation.module').then(m => m.StorelocationModule) },
  { path: 'aboutus', loadChildren: () => import('./pages/aboutus/aboutus.module').then(m => m.AboutusModule) },
  { path: 'privacypolicy', loadChildren: () => import('./pages/privacypolicy/privacypolicy.module').then(m => m.PrivacypolicyModule) },
  { path: 'return', loadChildren: () => import('./pages/return/return.module').then(m => m.ReturnModule) },
  { path: 'kyc', loadChildren: () => import('./profiledetails/kyc/kyc.module').then(m => m.KycModule) },
  { path: 'subscribedprod', loadChildren: () => import('./products/subscribedprod/subscribedprod.module').then(m => m.SubscribedprodModule) },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],

  exports: [RouterModule]
})
export class AppRoutingModule { }
