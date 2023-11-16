interface DataType {
  key: React.Key;
  buyer: ReactNode;
  quantity: number;
  price: number;
  time: string;
  status: ReactNode;
}
interface UserType {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
  full_name?: string;
  birthday?: string;
  phone?: string;
  address_wallet?: string;
  address_real?: string;
  is_active?: boolean;
  system_role?: string;
  account_balance?: number;
}
interface HistoryType {
  id?: string;
  product_id?: string;
  transaction_sf_id?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  transactions_fm?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
  transactions_sf?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
}
interface TopSellingType {
  Product?: {
    name?: string;
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    description?: string;
    created_at?: string;
    price?: number;
    updated_at?: string;
    quantity?: number;
    hashed_data?: string;
    id?: string;
    product_status?: string;
    product_type?: string;
  };
  total_quantity?: number;
  total_sales?: number;
}
interface CartItemType {
  id?: string;
  product_id?: string;
  user_id?: string;
  price?: number;
  quantity?: number;
  created_at?: string;
  product?: ProductType;
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    system_role?: string;
  };
}
interface ProductType {
  id?: string;
  name?: string;
  number_of_sales?: number;
  banner?: string;
  created_by?: string;
  description?: string;
  created_at?: string;
  price?: number;
  is_sale?: boolean;
  updated_at?: string;
  quantity?: number;
  hashed_data?: string;
  product_status?: string;
  product_type?: string;
  detail_description?: [
    {
      id?: string;
      title?: string;
      description?: string;
      image?: string;
      product_id?: string;
    }
  ];

  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
  };
}
interface StatisticalSystemType {
  statistical_user?: {
    total_user?: number;
    member_count?: number;
    seedling_count?: number;
    farmer_count?: number;
    manufacturer_count?: number;
  };
  statistical_product?: {
    total_product?: number;
    seedling_count?: number;
    farmer_count?: number;
    manufacturer_count?: number;
    total_product?: number;
    total_sales?: number;
  };
  statistical_transaction_sf?: {
    total_transaction_sf?: number;
  };
  statistical_transaction_fm?: {
    total_transaction_fm?: number;
  };
}

interface GrowUpType {
  id?: string;
  product_farmer_id?: string;
  description?: string;
  image?: string;
  video?: string;
  hashed_data?: string;
  created_at?: string;
  product_farmer?: {
    id?: string;
    product_id?: string;
    transaction_sf_id?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: string;
      created_by?: string;
      created_at?: string;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
        phone?: string;
      };
    };
  };
}
interface CommentItemType {
  content?: string;
  marketplace_id?: string;
  user_id?: string;
  id?: string;
  created_at?: string;
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
  };
  reply_comments?: [];
}
interface MarketType {
  id?: string;
  order_type?: string;
  order_id?: string;
  order_by?: string;
  hash_data?: string;
  created_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  comments?: {
    content?: string;
    marketplace_id?: string;
    user_id?: string;
    id?: string;
    created_at?: string;
    user?: string;
    reply_comments?: string;
  };
}

interface TransactionType {
  id?: string;
  product_id?: string;
  user_id?: string;
  price?: number;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  product?: ProductType;
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    system_role?: string;
  };
}

interface NotificationItemType {
  data?: {
    message?: string;
    params?: {
      product_id?: string;
      product_name?: string;
      notification_type?: string;
      marketplace_id?: string;
      action?: string;
    };
    data?: {
      created_at?: number;
      unread?: boolean;
      notification_id?: string;
    };
  };
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    system_role?: string;
  };
}
