import { Injectable, OnModuleInit } from '@nestjs/common';
import { read } from 'fs';
import { readFile } from 'fs/promises';
import { School } from './School';
import { SchoolDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { Observable, of, map, tap } from 'rxjs'
import { AxiosResponse } from "axios";
import { off } from 'process';
import { APISchools } from './APISchools';
@Injectable()
export class SchoolService implements OnModuleInit{
    private school_array : School[] = []

    constructor(private readonly httpService:HttpService){}

    //step extra on va sur internet
    async onModuleInit(): Promise<void>{
        await Promise.all([this.loadSchoolFromFile()]); //, this.loadSchoolFromAPI()
    }

    private async loadSchoolFromAPI(): Promise<void>{
        this.httpService
            .get<APISchools []>("https://data.opendatasoft.com/api/records/1.0/search/?dataset=fr-esr-principaux-etablissements-enseignement-superieur%40mesr&q=&sort=uo_lib&facet=type_d_etablissement&facet=typologie_d_universites_et_assimiles&facet=secteur_d_etablissement&facet=vague_contractuelle&facet=localisation&facet=uai&facet=siret&facet=siren&facet=identifiant_ror&facet=identifiant_grid&facet=identifiant_dataesr&facet=anciens_codes_uai&facet=com_nom&facet=dep_nom&facet=aca_nom&facet=reg_nom&facet=pays_etranger_acheminement&facet=statut_juridique_court&facet=qualification_long&facet=uai_rgp_loi_esr_2013&facet=universites_fusionnees&facet=etablissement_experimental&facet=statut_operateur_lolf&facet=identifiant_programme_lolf_chef_de_file") //url ici pour les données 
            .pipe(
                map((response) => {
                    return response.data;
                }),
                tap((api) => {
                Array.prototype.forEach((api, elem) => {
                    this.school_array.push({ 
                        libelle : api[elem].uo_lib,
                        sigle : api[elem].nom_court, //nom court peut etre ? => (ou qualification_court (qualification en priorité))
                        type : api[elem].type_d_etablissement,
                        secteur : api[elem].secteur_d_etablissement,
                        vague : api[elem].vague_contractuelle,
                        geolocalisation : api[elem].coordonnees,
                        date : api[elem].date_creation,
                        departement : api[elem].dep_nom,
                        region : api[elem].reg_nom,
                        adresse : api[elem].adresse_uai,
                        code_postal : api[elem].code_postal_uai,
                        numero_telephone : api[elem].numero_telephone_uai, 
                        site_web : api[elem].url,
                        compte_fb : api[elem].compte_facebook,
                        compte_twitter : api[elem].compte_twitter,
                        compte_insta : api[elem].compte_instagram,
                        favorite: false,
                    });
                });
            }),
            ).subscribe();
    }

    private async loadSchoolFromFile(): Promise<void>{
        let data_school : JSON
        try{
            const data = await readFile("./src/dataset.json");
            this.school_array = JSON.parse(data.toString()); //data_school
            //this.school_array = data_school["fields"] //this causes school_array to become undefined

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

    
}


//api = JSON.parse(api)
                //api.forEach((elem) => {
                //     this.school_array.push({ 
                //         libelle : elem.fields.uo_lib,
                //         sigle : elem.fields.nom_court, //nom court peut etre ? => (ou qualification_court (qualification en priorité))
                //         type : elem.fields.type_d_etablissement,
                //         secteur : elem.fields.secteur_d_etablissement,
                //         vague : elem.fields.vague_contractuelle,
                //         geolocalisation : elem.fields.coordonnees,
                //         date : elem.fields.date_creation,
                //         departement : elem.fields.dep_nom,
                //         region : elem.fields.reg_nom,
                //         adresse : elem.fields.adresse_uai,
                //         code_postal : elem.fields.code_postal_uai,
                //         numero_telephone : elem.fields.numero_telephone_uai, 
                //         site_web : elem.fields.url,
                //         compte_fb : elem.fields.compte_facebook,
                //         compte_twitter : elem.fields.compte_twitter,
                //         compte_insta : elem.fields.compte_instagram,
                //         favorite: false,
                //     });
                // });

            //     Object.keys(api).forEach((elem) => { 
            //         this.school_array.push({ 
            //             libelle : api[elem].uo_lib,
            //             sigle : api[elem].nom_court, //nom court peut etre ? => (ou qualification_court (qualification en priorité))
            //             type : api[elem].type_d_etablissement,
            //             secteur : api[elem].secteur_d_etablissement,
            //             vague : api[elem].vague_contractuelle,
            //             geolocalisation : api[elem].coordonnees,
            //             date : api[elem].date_creation,
            //             departement : api[elem].dep_nom,
            //             region : api[elem].reg_nom,
            //             adresse : api[elem].adresse_uai,
            //             code_postal : api[elem].code_postal_uai,
            //             numero_telephone : api[elem].numero_telephone_uai, 
            //             site_web : api[elem].url,
            //             compte_fb : api[elem].compte_facebook,
            //             compte_twitter : api[elem].compte_twitter,
            //             compte_insta : api[elem].compte_instagram,
            //             favorite: false,
            //         });
            //     });
            // }),
            // ).subscribe();