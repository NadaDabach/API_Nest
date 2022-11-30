import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { School } from './School';
import { SchoolDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs'
import { APISchools } from './APISchools';
@Injectable()
export class SchoolService implements OnModuleInit{
    private school_array : School[] = []

    constructor(private readonly httpService:HttpService){}

    async onModuleInit(): Promise<void>{
        await Promise.all([this.loadSchoolFromFile() ,this.loadSchoolFromAPI()]);
    }

    private async loadSchoolFromAPI(): Promise<void>{
        this.httpService
            .get<APISchools []>("https://data.opendatasoft.com/api/records/1.0/search/?dataset=fr-esr-principaux-etablissements-enseignement-superieur%40mesr&q=&rows=255&sort=uo_lib&facet=etablissement_id_paysage&facet=type_d_etablissement&facet=typologie_d_universites_et_assimiles&facet=secteur_d_etablissement&facet=vague_contractuelle&facet=localisation&facet=uai&facet=siret&facet=siren&facet=identifiant_ror&facet=identifiant_grid&facet=identifiant_pic&facet=identifiant_dataesr&facet=anciens_codes_uai&facet=com_nom&facet=dep_nom&facet=aca_nom&facet=reg_nom&facet=pays_etranger_acheminement&facet=statut_juridique_court&facet=qualification_long&facet=uai_rgp_loi_esr_2013&facet=universites_fusionnees&facet=etablissement_experimental&facet=statut_operateur_lolf&facet=identifiant_programme_lolf_chef_de_file") //url ici pour les données 
            .pipe(
                map((response) => {
                    return response.data;
                }),
                tap((api) => {
                    for (let i = 0; i < api.length; i++){
                        this.school_array.push({ 
                            libelle : api[0].records[i].fields.uo_lib,
                            sigle : api[0].records[i].fields.nom_court,
                            type : api[0].records[i].fields.type_d_etablissement,
                            secteur : api[0].records[i].fields.secteur_d_etablissement,
                            vague : api[0].records[i].fields.vague_contractuelle,
                            geolocalisation : api[0].records[i].fields.coordonnees,
                            date : api[0].records[i].fields.date_creation,
                            departement : api[0].records[i].fields.dep_nom,
                            region : api[0].records[i].fields.reg_nom,
                            adresse : api[0].records[i].fields.adresse_uai,
                            code_postal : api[0].records[i].fields.code_postal_uai,
                            numero_telephone : api[0].records[i].fields.numero_telephone_uai, 
                            site_web : api[0].records[i].fields.url,
                            compte_fb : api[0].records[i].fields.compte_facebook,
                            compte_twitter : api[0].records[i].fields.compte_twitter,
                            compte_insta : api[0].records[i].fields.compte_instagram,
                            favorite: false,
                        });
                    }
            }),
            ).subscribe();
    }

    private async loadSchoolFromFile(): Promise<void>{
        let data_school : JSON
        try{
            const data = await readFile("./src/dataset.json");
            data_school = JSON.parse(data.toString());
            for (let i = 0; i < Object.keys(data_school).length; i++) {
                this.school_array.push({ 
                    libelle : data_school[i].fields.uo_lib,
                    sigle : data_school[i].fields.nom_court,
                    type : data_school[i].fields.type_d_etablissement,
                    secteur : data_school[i].fields.secteur_d_etablissement,
                    vague : data_school[i].fields.vague_contractuelle,
                    geolocalisation : data_school[i].fields.coordonnees,
                    date : data_school[i].fields.date_creation,
                    departement : data_school[i].fields.dep_nom,
                    region : data_school[i].fields.reg_nom,
                    adresse : data_school[i].fields.adresse_uai,
                    code_postal : data_school[i].fields.code_postal_uai,
                    numero_telephone : data_school[i].fields.numero_telephone_uai, 
                    site_web : data_school[i].fields.url,
                    compte_fb : data_school[i].fields.compte_facebook,
                    compte_twitter : data_school[i].fields.compte_twitter,
                    compte_insta : data_school[i].fields.compte_instagram,
                    favorite: false,
                });
            }
        }
        catch(error){
            console.log("Err: $(error)");
        }

    }

    addSchool(schoolToAdd: SchoolDto) : void{
        if (! (this.school_array.find(school => school.libelle === schoolToAdd.libelle)))
            this.school_array.push(schoolToAdd);
            
    }
    getSchool(name: string) : School | undefined{
        return this.school_array.find(school => school.libelle === name);
        
    }
    getSchoolsOfDepartement(depart: string) : School[]{
        return this.school_array.filter(school => school.departement === depart);
    }
    
    getAllSchools() : School[]{
        //sort by favorite
        this.school_array.sort((firstObject: School, secondObject: School) =>
    	(firstObject.favorite < secondObject.favorite) ? 1 : -1);
        return this.school_array;
    }
    getTotalNumberOfSchools() : number{
        return this.school_array.length;
    }
    deleteSchoolByName(name: string){
        if (this.school_array.find(school => school.libelle === name)){
            this.school_array = this.school_array.filter(school => school.libelle != name);
        }
    }
    inverseFavoriteLogic(schoolToChange : string) : void{
        let copySchool : School
        if (this.school_array.find(school => school.libelle === schoolToChange))
            copySchool = this.school_array.find(school => school.libelle === schoolToChange)
            this.deleteSchoolByName(schoolToChange)
            copySchool.favorite = !copySchool.favorite
            this.school_array.push(copySchool);
    }

    searchByLibelleOrDepartement(searchTerm: string): School[] {
        const termRecolte = searchTerm.toLowerCase().trim();
    
        return this.school_array.filter((school) => {
          return (
            school.libelle.toLowerCase().includes(termRecolte) ||
            school.departement.toLowerCase().includes(termRecolte)
          );
        });
      }

    
}