!                 Status
!
!                  "AA"   Check digit is valid and Pen is confirmed  
!                  "B0"   Check digit is valid but PEN appears to be for a
!                         different student. No mathces are found using points
!                         formula. The "B0" is changed to "F1" (the one match
!                         being the supplied PEN) so B0 should never be returned
!                         to the calling program. 
!                  "B1"   Check digit is valid but PEN is merged. True (correct)
!                         PEN is returned as possible match. 
!                  "BM"   Check digit is valid but PEN appears to be for another
!                         student. Multiple matches found using points formula.
!                  "C0"   Check digit is invalid or PEN is not on file and no
!                         matches are found using points formula. A brand new 
!                         PEN is assigned
!                  "C1"   Check digit is invalid or PEN is not on file an one 
!                         match is found using points formula.
!                  "CM"   Check digit is invalid or PEN is not on file and 
!                         multiple matches are found using points formula.
!                  
!                 If one match is found, the PEN will be returned in the 
!                 STUD_NO field except for the "F1" match where the questionable
!                 match is returned in PEN1. If multiple matches are found, the
!                 "possible" PEN's will be returned in PEN1 thru PEN20.
!
!              2. If the transaction does not contain a PEN, the Pen Master
!                 will be searched for matches. The Status Code will be set as
!                 follows:
!
!                 Status
!
!                  "D0"   No matches found, brand new PEN assigned
!                  "D1"   One and only one match found 
!                  "DM"   Multiple matches found using points formula
!
!                  "F1"   One Match found using points only formula
!
!                  "G0"   Insufficient demographic data to perform
!                         pen processing when in update mode and the 
!                         pen process has returned a "D0" code

!-------------------------------------------------------------------------------
! Program....: NEW_MATCH.BAS
! Notes......: Subroutine to lookup a student on the PEN master file and 
!              determine if the student already exists.
!
!              A driver program will call this subroutine passing demographic
!              data related to a specific student. 
!
!              Maintenance:
!              Compile NEW_MATCH.BAS and like any other basic program.
!              It is linked to object module NEW_MATCH_SQL.SQLMOD. 
!              If you need to change the SQLMOD module, use the editor to change
!              it, then define a symbol SQLMOD :== $SQL$MOD71, and then type
!              $SQLMOD NEW_MATCH_SQL.SQLMOD to create NEW_MATCH_SQL.OBJ. 
!              Type $lib/obj/rep PEN$EXE:PEN_SUBS NEW_MATCH_SQL to put 
!              the module in the object library.  To link this all together,
!              type @PEN$EXE:PENEXTERNAL.
!              This links object modules in PEN$EXE:PEN_SUBS.OLB and
!              SYS$LIBRARY:SQL$USER71.OLB, taking direction from
!              PEN$EXE:PEN_SUBS.DAT and QKDRIVER_PSECT.OPT.
!              Move the QKDRIVER.PHEXE to production.
!
!       PEN Status Codes that can be returned by this subroutine:
!
!       AA - Submitted PEN confirmed
!       B0 - Wrong PEN submitted.
!            No match found, new PEN assigned (no PEN if t_assign_new_pen = "N")
!       B1 - Wrong PEN submitted. 
!            Single Match found and PEN assigned (or matched to 'merged to' PEN)
!       BM - Wrong PEN submitted.
!            Multiple matches found, no PEN assigned
!       C0 - PEN submitted with invalid check digit.
!            No match found, new PEN assigned (no PEN if t_assign_new_pen = "N")
!       C1 - PEN submitted with invalid check digit.
!            Single Match found and PEN assigned (or matched to 'merged to' PEN)
!       CM - PEN submitted with invalid check digit. 
!            Multiple matches found, no PEN assigned
!       D0 - No PEN submitted.
!            No match found, new PEN assigned (no PEN if t_assign_new_pen = "N")
!       D1 - No PEN submitted.
!            Single Match found and PEN assigned (or matched to 'merged to' PEN)
!       DM - No PEN submitted. Multiple matches found, no PEN assigned
!       EA - No match found, error in assigning new PEN
!       F1 - Single Questionable match found
!       G0 - No match found, bad demographics supplied, no new PEN assigned
!       UR - Match(es) found with unknown result in Match Code Table