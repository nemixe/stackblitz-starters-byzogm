"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

const PRODUCTS: Product[] = [
  { id: 1, title: "Wireless Headphones", price: 99.99 },
  { id: 2, title: "Leather Backpack", price: 129.99 },
  { id: 3, title: "Fitness Tracker", price: 79.99 },
  { id: 4, title: "Smart Water Bottle", price: 49.99 },
];

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((p) => p.id !== product.id));
  };

  const totalPrice = cart
    .reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
    .toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {PRODUCTS.map((product) => (
        <Card
          key={product.id}
          {...product}
          isAddedToCart={cart.some((p) => p.id === product.id)}
          onAddToCart={(data) => setCart([...cart, data])}
        />
      ))}
      {cart.length > 0 && (
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Cart</h2>
            <div className="mt-4 space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-semibold">
                    {product.title} x {product.quantity}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-bold">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(product)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-semibold">Total:</p>
              <p className="text-primary font-bold">${totalPrice}</p>
            </div>
            <Button size="sm" className="w-full mt-4">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type CardProps = {
  id: number;
  title: string;
  price: number;
  isAddedToCart: boolean;
  onAddToCart: (data: CartItem) => void;
};

const Card = (props: CardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    props.onAddToCart({ ...props, quantity });
  };

  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
      <img
        src="/placeholder.svg"
        alt="Product 1"
        width={400}
        height={300}
        className="w-full h-60 object-cover"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{props.title}</h3>
        <p className="text-primary font-bold text-xl">${props.price}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={props.isAddedToCart}
              onClick={() => setQuantity((old) => (old <= 1 ? 1 : old - 1))}
            >
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span className="text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              disabled={props.isAddedToCart}
              onClick={() => setQuantity(quantity + 1)}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
          <Button
            size="sm"
            disabled={props.isAddedToCart}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

// Icon components remain unchanged
function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
