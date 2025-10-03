package com.prueba.back.business;

import com.prueba.back.dto.SaleDTO;
import com.prueba.back.dto.lighDTO.ProductSaleLightForSale;
import com.prueba.back.entity.Person;
import com.prueba.back.entity.Product;
import com.prueba.back.entity.ProductSale;
import com.prueba.back.entity.Sale;
import com.prueba.back.service.PersonService;
import com.prueba.back.service.ProductSaleService;
import com.prueba.back.service.ProductService;
import com.prueba.back.service.SaleService;
import com.prueba.back.utilities.mapStruct.ProductSaleMap;
import com.prueba.back.utilities.mapStruct.SaleMap;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class SaleBusiness {
    private final PersonService personService;
    private final SaleService saleService;
    private final ProductSaleService productSaleService;
    private final ProductService productService;

    public SaleBusiness(PersonService personService, SaleService saleService, ProductSaleService productSaleService, ProductService productService) {
        this.personService = personService;
        this.saleService = saleService;
        this.productSaleService = productSaleService;
        this.productService = productService;
    }

    public SaleDTO createSale(SaleDTO  saleDTO){
        Person person = personService.getById(saleDTO.getPerson().getId());
        List<Product> products = productService.getAllByIds(
                saleDTO.getProductSales().stream().map(ps -> {
                    Product p = new Product();
                    p.setId(ps.getProduct().getId());
                    return p;
                }).toList()
        );
        Sale sale = new Sale();
        sale.setTotalAmount(products.stream().mapToDouble(Product::getPrice).sum());
        sale.setItemCount(saleDTO.getProductSales().stream().mapToInt(ProductSaleLightForSale::getQuantity).sum());
        sale.setPerson(person);
        sale.setDate(saleDTO.getDate());
        sale.setState(true);
        Sale savedSale = saleService.save(sale);

        List<ProductSaleLightForSale> productSales = saleDTO.getProductSales();
        List<ProductSale> productSaleEntities = ProductSaleMap.INSTANCE.toEntityList(productSales);
        for (ProductSale ps : productSaleEntities) {
            Product product = productService.getById(ps.getProduct().getId());
            ps.setActualPrice(product.getPrice());
            ps.setProduct(product);
            ps.setQuantity(ps.getQuantity());
            ps.setSale(savedSale);
            ps.setCreatedAt(LocalDateTime.now());
        }
        productSaleService.saveAll(productSaleEntities);
        return SaleMap.INSTANCE.toDTO(savedSale);
    }

    public List<SaleDTO> getAllSales() {
        List<Sale> sales = saleService.getAll();
        return SaleMap.INSTANCE.toDTOList(sales);
    }

    public List<SaleDTO> getSalesByPersonId(Long personId) {
        List<Sale> sales = saleService.getByPersonId(personId);
        return SaleMap.INSTANCE.toDTOList(sales);
    }
}
