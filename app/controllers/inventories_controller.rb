class InventoriesController < ApplicationController

  def index
     
  end

  def getServices
    
  end

  def show

    total = 0
    inventory = Inventory.all
    @result_inventory = inventory.joins(:on_stocks, :inventory_stocks)
    
    render json: @result_inventory, :status => "ok"
  end

  def submitStock
    @inventory = Inventory.create(inventory_params)
    inventory_data = Inventory.last
    

    @onstock = OnStock.create(product_type: params[:product_type], category_id: inventory_data.category_id, inventory_id: inventory_data.id)

    stock_last = OnStock.last

    @inventoryStock = InventoryStock.create(inventory_id: inventory_data.id, on_stock_id: stock_last.id)

    if @inventory.save && @onstock.save && @inventoryStock.save
      render json: inventory_params, :status => "ok"
    else
      render :text => '{"error": "not_found"}'
    end
    
  end

  def getInventoryStocks
    # @stocks = Inventory.select("inv.product_name, stock.product_type").joins(:on_stock)
    @inventoryStock = Inventory.inventory_stocks.on_stock

    render json: @inventoryStock, :status => "ok"
  end

  def getInventories
    @inventories = Inventory.all.order("transaction_date desc")

    render json: @inventories, :status => "ok"
  end

  private

  def inventory_params
    params.require(:inventory).permit(:category_id, :product_name, :product_details, :price, :quantity, :transaction_date, :product_type).merge(user_id: current_user.id)
  end

end
