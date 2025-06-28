<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'uniq_id',
        'customer_id',
        'order_summary',
        'payment_status',
        'total_purchase_price',
        'total',
        'paid_amount',
        'remaining_amount',
        'discount',
        'vat_percentage',
        'eventual_total',
        'profit',
        // 'due_amount',
        'created_at',
        'updated_at',
    ];


    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products')
            ->withPivot('quantity')
            ->withTimestamps();
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
