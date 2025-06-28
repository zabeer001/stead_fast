<?php

namespace Database\Seeders;

use App\Helpers\HelperMethods;
use App\Models\Customer;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;
use App\Models\PromoCode;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();
        $promoCodes = PromoCode::all();

        if ($products->isEmpty()) {
            $this->command->warn('No products found. Please seed the products table first.');
            return;
        }

        if ($promoCodes->isEmpty()) {
            $this->command->warn('No promo codes found. Please seed the promocodes table first.');
            return;
        }

        $start = Carbon::now()->subMonths(6);
        $end = Carbon::now();

        for ($i = 1; $i <= 1000; $i++) {
            // Generate random date for each order
            $randomDate = Carbon::createFromTimestamp(rand($start->timestamp, $end->timestamp));

            $selectedPromo = $promoCodes->random();

            $customer = Customer::create([
                'full_name'       => "Customer {$i}",
                'last_name'       => "Smith",
                'email'           => "customer{$i}@example.com",
                'phone'           => "0170000000{$i}",
                'full_address'    => "House {$i}, Road {$i}, City",
                'city'            => "City {$i}",
                'state'           => "State {$i}",
                'postal_code'     => "120{$i}",
                'country'         => "Bangladesh",
                'created_at'      => $randomDate,
                'updated_at'      => $randomDate,
            ]);

            $totalPurchasePrice = rand(100, 200);
            $profit = rand(20, 80);
            $total = $totalPurchasePrice + $profit;
            $discount = rand(0, 30);
            $vatPercentage = 5;
            $vatAmount = ($total * $vatPercentage) / 100;
            $eventualTotal = $total + $vatAmount - $discount;
            $paidAmount = rand(0, (int)$eventualTotal);
            $remainingAmount = $eventualTotal - $paidAmount;

            $order = Order::create([
                'uniq_id'              => HelperMethods::generateUniqueId(),
                'customer_id'          => $customer->id,
                'order_summary'        => "Subtotal: \$$total | VAT: \$$vatAmount | Discount: \$$discount | Total: \$$eventualTotal",
                'payment_status'       => $paidAmount >= $eventualTotal ? 'paid' : 'due',
                'total_purchase_price' => $totalPurchasePrice,
                'total'                => $total,
                'paid_amount'          => $paidAmount,
                'remaining_amount'     => $remainingAmount,
                'discount'             => $discount,
                'vat_percentage'       => $vatPercentage,
                'eventual_total'       => $eventualTotal,
                'profit'               => $profit,
                'created_at'           => $randomDate,
                'updated_at'           => $randomDate,
            ]);

            // Prepare sync data: product_id => ['quantity' => X]
            $randomProducts = $products->random(rand(1, 3));
            $syncData = [];

            foreach ($randomProducts as $product) {
                $syncData[$product->id] = ['quantity' => rand(1, 5)];
            }

            $order->products()->sync($syncData);
        }
    }
}
