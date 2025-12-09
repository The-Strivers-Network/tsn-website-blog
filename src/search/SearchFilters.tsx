'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

interface Category {
  id: string;
  title: string;
}

interface SearchFiltersProps {
  categories: Category[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentDateFrom = searchParams.get('dateFrom') || '';
  const currentDateTo = searchParams.get('dateTo') || '';
  const currentSortBy = searchParams.get('sortBy') || 'publishedAt';
  const currentSortOrder = searchParams.get('sortOrder') || 'desc';

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleCategoryChange = (value: string) => {
    updateParams('category', value);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams('dateFrom', e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams('dateTo', e.target.value);
  };

  const handleSortByChange = (value: string) => {
    updateParams('sortBy', value);
  };

  const handleSortOrderChange = (value: string) => {
    updateParams('sortOrder', value);
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="category-filter" className="text-sm font-medium">
            Category
          </Label>
          <Select value={currentCategory || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From Filter */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="date-from" className="text-sm font-medium">
            From Date
          </Label>
          <Input
            id="date-from"
            type="date"
            value={currentDateFrom}
            onChange={handleDateFromChange}
            className="w-full"
          />
        </div>

        {/* Date To Filter */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="date-to" className="text-sm font-medium">
            To Date
          </Label>
          <Input
            id="date-to"
            type="date"
            value={currentDateTo}
            onChange={handleDateToChange}
            className="w-full"
          />
        </div>

        {/* Sort Options */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="sort-by" className="text-sm font-medium">
            Sort By
          </Label>
          <div className="flex gap-2">
            <Select value={currentSortBy} onValueChange={handleSortByChange}>
              <SelectTrigger id="sort-by" className="flex-1">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">Date</SelectItem>
                <SelectItem value="title">Name</SelectItem>
              </SelectContent>
            </Select>
            <Select value={currentSortOrder} onValueChange={handleSortOrderChange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Desc</SelectItem>
                <SelectItem value="asc">Asc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
