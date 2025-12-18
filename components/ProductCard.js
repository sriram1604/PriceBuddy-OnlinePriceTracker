"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
        setDeleting(true);
        await deleteProduct(product.id);
        setDeleting(false);
        setOpen(false);
};


  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-500">
                {product.currency} {product.current_price}
              </span>
              <Badge variant="secondary" className="gap-1">
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Chart
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Product
            </Link>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                >
                <Trash2 className="w-4 h-4" />
                Remove
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                    <Trash2 className="w-5 h-5" />
                    Remove Product?
                </DialogTitle>

                <DialogDescription className="text-gray-600">
                    This product will be removed from tracking.
                    <br />
                    <span className="font-medium text-gray-800">
                    This action cannot be undone.
                    </span>
                </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                ⚠️ Price history and alerts for this product will be deleted.
                </div>

                <DialogFooter className="gap-2">
                <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={deleting}
                >
                    Cancel
                </Button>

                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="gap-1"
                >
                    <Trash2 className="w-4 h-4" />
                    {deleting ? "Removing..." : "Remove Product"}
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>

        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="pt-0">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
}