import { computed, inject } from "@angular/core";
import { Product } from "./model/products";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { produce } from "immer";
import { HotToastService } from "@ngxpert/hot-toast";

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlist: [];
  cart: [];
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root',
    },

    withState({
        products: [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality over-ear headphones with noise cancellation.',
      price: 79.99,
      imageUrl: 'https://picsum.photos/300/300?random=1',
      rating: 4.7,
      reviewsCount: 245,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Gaming Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with blue switches.',
      price: 59.99,
      imageUrl: 'https://picsum.photos/300/300?random=2',
      rating: 4.6,
      reviewsCount: 189,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      description: 'Track your heart rate, sleep, and daily activities.',
      price: 129.99,
      imageUrl: 'https://picsum.photos/300/300?random=3',
      rating: 4.8,
      reviewsCount: 321,
      inStock: false,
      category: 'accessories',
    },
    {
      id: 4,
      name: "Men's Casual Sneakers",
      description: 'Comfortable sneakers suitable for everyday wear.',
      price: 49.99,
      imageUrl: 'https://picsum.photos/300/300?random=4',
      rating: 4.4,
      reviewsCount: 156,
      inStock: true,
      category: 'Fashion',
    },
    {
      id: 5,
      name: "Women's Leather Handbag",
      description: 'Elegant handbag crafted from premium leather.',
      price: 89.99,
      imageUrl: 'https://picsum.photos/300/300?random=5',
      rating: 4.9,
      reviewsCount: 278,
      inStock: true,
      category: 'Fashion',
    },
    {
      id: 6,
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof speaker with powerful bass and long battery life.',
      price: 39.99,
      imageUrl: 'https://picsum.photos/300/300?random=6',
      rating: 4.5,
      reviewsCount: 210,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 7,
      name: 'Ergonomic Office Chair',
      description: 'Adjustable office chair with lumbar support.',
      price: 199.99,
      imageUrl: 'https://picsum.photos/300/300?random=7',
      rating: 4.6,
      reviewsCount: 142,
      inStock: false,
      category: 'Furniture',
    },
    {
      id: 8,
      name: 'Stainless Steel Water Bottle',
      description: 'Vacuum insulated bottle keeps drinks cold for 24 hours.',
      price: 24.99,
      imageUrl: 'https://picsum.photos/300/300?random=8',
      rating: 4.7,
      reviewsCount: 387,
      inStock: true,
      category: 'Home & Kitchen',
    },
    {
      id: 9,
      name: 'Professional DSLR Camera',
      description: '24MP DSLR camera with 18-55mm lens kit.',
      price: 799.99,
      imageUrl: 'https://picsum.photos/300/300?random=9',
      rating: 4.9,
      reviewsCount: 98,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 10,
      name: 'Classic Cotton T-Shirt',
      description: 'Soft and breathable cotton t-shirt for everyday comfort.',
      price: 19.99,
      imageUrl: 'https://picsum.photos/300/300?random=10',
      rating: 4.3,
      reviewsCount: 412,
      inStock: true,
      category: 'Clothing',
    },
        ],
        category: 'all',
        wishlist: [] as Product[],
        cart: [] as Product[],
    }),

    withComputed(({category,products,wishlist,cart}) => ({
        filteredProducts: computed(() => {
            if(category() === 'all') return products();
            return products().filter((p) => p.category.toLowerCase() === category().toLowerCase());  
        }),

        wishlistCount: computed(() =>  wishlist().length),

        cartCount: computed(() =>  cart().length),


    })),

    withMethods((store, toast=inject(HotToastService)) => ({
        setCategory:signalMethod<string>((category: string) => {
            patchState(store,{category});   
        }),

        addToWishlist: (product: Product) => {
            const update = produce(store.wishlist(), (draft : Product[]) => {
                if (!draft.find((p) => p.id === product.id)) {
                    draft.push(product);
                }
                
            });
            patchState(store, { wishlist: update });
            toast.success(`${product.name} added to wishlist!`);
        },
        removeWishlist: (product: Product) => {
          patchState(store, { wishlist: store.wishlist().filter((p) => p.id !== product.id) });
          toast.success(`${product.name} removed from wishlist!`);
        },
        clearWishlist: () => {
          patchState(store, { wishlist: [] });
          toast.success(`Wishlist cleared!`);
        },
      })),
)

