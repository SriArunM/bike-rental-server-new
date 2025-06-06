declare module 'razorpay' {
    interface RazorpayOptions {
        key_id: string;
        key_secret: string;
    }

    interface OrderOptions {
        amount: number;
        currency: string;
        receipt: string;
    }

    interface Order {
        id: string;
        amount: number;
        currency: string;
        receipt: string;
        status: string;
    }

    class Razorpay {
        constructor(options: RazorpayOptions);
        orders: {
            create(options: OrderOptions): Promise<Order>;
            fetch(orderId: string): Promise<Order>;
        };
    }

    export default Razorpay;
} 