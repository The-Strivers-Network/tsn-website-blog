import type { Metadata } from 'next/types';

import { CollectionArchive } from '@/components/CollectionArchive';
import configPromise from '@payload-config';
import { getPayload, Where } from 'payload';
import React from 'react';
import { Search } from '@/search/Component';
import { SearchFilters } from '@/search/SearchFilters';
import PageClient from './page.client';
import { CardPostData } from '@/components/Card';

type Args = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: 'title' | 'publishedAt';
    sortOrder?: 'asc' | 'desc';
  }>;
};

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const {
    q: query,
    category,
    dateFrom,
    dateTo,
    sortBy = 'publishedAt',
    sortOrder = 'desc',
  } = await searchParamsPromise;

  const payload = await getPayload({ config: configPromise });

  // Fetch all categories for the filter dropdown
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
  });

  const categories = categoriesResult.docs.map((cat) => ({
    id: String(cat.id),
    title: cat.title,
  }));

  // Build the where clause for filtering
  const whereConditions: Where[] = [];

  // Text search conditions
  if (query) {
    whereConditions.push({
      or: [
        { title: { like: query } },
        { 'meta.description': { like: query } },
        { 'meta.title': { like: query } },
        { slug: { like: query } },
      ],
    });
  }

  // Category filter
  if (category) {
    whereConditions.push({
      categories: { contains: category },
    });
  }

  // Date range filters
  if (dateFrom) {
    whereConditions.push({
      publishedAt: { greater_than_equal: new Date(dateFrom).toISOString() },
    });
  }

  if (dateTo) {
    // Add one day to include the end date fully
    const endDate = new Date(dateTo);
    endDate.setDate(endDate.getDate() + 1);
    whereConditions.push({
      publishedAt: { less_than: endDate.toISOString() },
    });
  }

  // Only show published posts
  whereConditions.push({
    _status: { equals: 'published' },
  });

  // Build the final where clause
  const whereClause: Where | undefined =
    whereConditions.length > 0
      ? {
          and: whereConditions,
        }
      : undefined;

  // Query posts with filters and sorting
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    sort: sortOrder === 'desc' ? `-${sortBy}` : sortBy,
    where: whereClause,
  });

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-8">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-12">Search</h1>

          <div className="max-w-[50rem] mx-auto mb-8">
            <Search />
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-8">
        <SearchFilters categories={categories} />
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container text-center text-muted-foreground">
          No results found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `The Strivers' Network Search`,
  };
}
